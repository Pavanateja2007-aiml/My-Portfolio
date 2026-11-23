import {
  CURATED_PDF_CERTIFICATES,
  CURATED_PHOTOGRAPHY_MANIFEST,
  CURATED_VISUAL_CERTIFICATES,
  PdfCertificateEntry,
  PhotoItem,
  VisualCertificateItem,
  buildPdfArchiveEntry,
  buildPhotoItemFromPath,
} from '../data/manifests';

interface GitTreeItem {
  path: string;
  type: 'blob' | 'tree';
}

interface GitTreeResponse {
  tree?: GitTreeItem[];
}

export interface AssetLoadResult<T> {
  items: T[];
  source: 'github-live' | 'manifest-fallback';
  notice?: string;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function isImagePath(path: string): boolean {
  const lower = path.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function encodePath(path: string): string {
  return path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

async function fetchGitTreeCached(
  owner: string,
  repo: string
): Promise<GitTreeItem[] | null> {
  const cacheKey = `pt_gh_tree_${owner}_${repo}_v1`;

  try {
    const cachedRaw = sessionStorage.getItem(cacheKey);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw) as { ts: number; items: GitTreeItem[] };
      if (Date.now() - cached.ts < CACHE_TTL_MS && Array.isArray(cached.items)) {
        return cached.items;
      }
    }
  } catch {
    // Ignore storage access errors in private browsing / sandboxed iframes
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as GitTreeResponse;
    if (!Array.isArray(payload.tree)) {
      return null;
    }

    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ ts: Date.now(), items: payload.tree })
      );
    } catch {
      // Non-fatal cache write failure
    }

    return payload.tree;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

function humanizeFilename(filePath: string): string {
  const base = filePath.split('/').pop() ?? filePath;
  return base
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[_-\s]*/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/**
 * Loads visual certificate images (live from GitHub repositories, merging verified metadata,
 * with automatic fallback to curated manifest when rate-limited or offline).
 */
export async function loadCertificatesData(): Promise<{
  visual: AssetLoadResult<VisualCertificateItem>;
  pdfs: AssetLoadResult<PdfCertificateEntry>;
}> {
  const [certsTree, profileTree] = await Promise.all([
    fetchGitTreeCached('Pavanateja2007-aiml', 'Certifications'),
    fetchGitTreeCached('Pavanateja2007-aiml', 'VemuriPavanateja2007'),
  ]);

  // 1. Visual certificate images (PNGs/JPGs from both repos)
  let visualItems: VisualCertificateItem[] = CURATED_VISUAL_CERTIFICATES;
  let visualSource: 'github-live' | 'manifest-fallback' = 'manifest-fallback';
  let visualNotice: string | undefined;

  if (profileTree || certsTree) {
    const knownByPath = new Map(
      CURATED_VISUAL_CERTIFICATES.map((item) => [item.filePath, item])
    );
    const merged: VisualCertificateItem[] = [];
    const seenPaths = new Set<string>();

    // First preserve curated order for known verified certificates
    for (const curated of CURATED_VISUAL_CERTIFICATES) {
      if (
        !profileTree ||
        profileTree.some((node) => node.type === 'blob' && node.path === curated.filePath)
      ) {
        merged.push(curated);
        seenPaths.add(curated.filePath);
      }
    }

    // Add any newly uploaded image files inside Certifications/Professional Certificates
    if (certsTree) {
      for (const node of certsTree) {
        if (
          node.type === 'blob' &&
          node.path.startsWith('Professional Certificates/') &&
          isImagePath(node.path) &&
          !seenPaths.has(node.path)
        ) {
          const folder = node.path.split('/')[1] ?? 'Verified Credential';
          merged.push({
            id: node.path.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: humanizeFilename(node.path),
            issuer: folder,
            group: 'Professional',
            filePath: node.path,
            imageUrl: `https://raw.githubusercontent.com/Pavanateja2007-aiml/Certifications/main/${encodePath(node.path)}`,
            githubFileUrl: `https://github.com/Pavanateja2007-aiml/Certifications/blob/main/${encodePath(node.path)}`,
          });
          seenPaths.add(node.path);
        }
      }
    }

    // Add any newly uploaded image files inside VemuriPavanateja2007 certificate folders
    if (profileTree) {
      for (const node of profileTree) {
        if (
          node.type === 'blob' &&
          (node.path.startsWith('Professional Certificate Images/') ||
            node.path.startsWith('Internship Certificates/')) &&
          isImagePath(node.path) &&
          !seenPaths.has(node.path) &&
          !knownByPath.has(node.path)
        ) {
          const isInternship = node.path.startsWith('Internship Certificates/');
          merged.push({
            id: node.path.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: humanizeFilename(node.path),
            issuer: isInternship ? 'Virtual Internship' : 'Professional Certificate',
            group: isInternship ? 'Internship' : 'Professional',
            filePath: node.path,
            imageUrl: `https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/${encodePath(node.path)}`,
            githubFileUrl: `https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/${encodePath(node.path)}`,
          });
          seenPaths.add(node.path);
        }
      }
    }

    if (merged.length > 0) {
      visualItems = merged;
      visualSource = 'github-live';
    }
  } else {
    visualNotice =
      'Showing verified repository manifest (GitHub API rate limit or offline fallback).';
  }

  // 2. Full PDF Credential Archive from Certifications/Professional Certificates
  let pdfItems: PdfCertificateEntry[] = CURATED_PDF_CERTIFICATES;
  let pdfSource: 'github-live' | 'manifest-fallback' = 'manifest-fallback';

  if (certsTree) {
    const livePdfs = certsTree
      .filter(
        (node) =>
          node.type === 'blob' &&
          node.path.startsWith('Professional Certificates/') &&
          node.path.toLowerCase().endsWith('.pdf')
      )
      .map((node) => buildPdfArchiveEntry(node.path));

    if (livePdfs.length > 0) {
      pdfItems = livePdfs;
      pdfSource = 'github-live';
    }
  }

  return {
    visual: { items: visualItems, source: visualSource, notice: visualNotice },
    pdfs: { items: pdfItems, source: pdfSource },
  };
}

/**
 * Loads Pavanateja's actual photography from Certifications/Interests/Photo Graphs
 * via GitHub recursive tree API with verified manifest fallback.
 */
export async function loadPhotographyData(): Promise<AssetLoadResult<PhotoItem>> {
  const certsTree = await fetchGitTreeCached('Pavanateja2007-aiml', 'Certifications');

  if (!certsTree) {
    return {
      items: CURATED_PHOTOGRAPHY_MANIFEST,
      source: 'manifest-fallback',
      notice:
        'Showing verified repository manifest (GitHub API rate limit or offline fallback).',
    };
  }

  const livePhotos = certsTree
    .filter(
      (node) =>
        node.type === 'blob' &&
        node.path.startsWith('Interests/Photo Graphs/') &&
        isImagePath(node.path)
    )
    .map((node) => buildPhotoItemFromPath(node.path));

  if (livePhotos.length === 0) {
    return {
      items: CURATED_PHOTOGRAPHY_MANIFEST,
      source: 'manifest-fallback',
    };
  }

  // Interleave collections slightly when viewing "All" so the masonry gallery has varied rhythm
  const curatedOrder = new Map(
    CURATED_PHOTOGRAPHY_MANIFEST.map((p, idx) => [p.filePath, idx])
  );
  livePhotos.sort((a, b) => {
    const ia = curatedOrder.get(a.filePath) ?? 999;
    const ib = curatedOrder.get(b.filePath) ?? 999;
    if (ia !== ib) return ia - ib;
    return a.filePath.localeCompare(b.filePath);
  });

  return {
    items: livePhotos,
    source: 'github-live',
  };
}
