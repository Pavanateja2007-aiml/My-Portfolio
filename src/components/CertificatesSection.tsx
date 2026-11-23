import { ExternalLink, FileText, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { PdfCertificateEntry, VisualCertificateItem } from '../data/manifests';
import { loadCertificatesData } from '../lib/githubAssets';
import { LightboxSlide } from './LightboxModal';

type CertTab = 'All' | 'Professional' | 'Internship' | 'PDF Archive';

interface CertificatesSectionProps {
  onOpenLightbox: (slides: LightboxSlide[], startIndex: number) => void;
}

const CERT_REPO_URL =
  'https://github.com/Pavanateja2007-aiml/Certifications/tree/main/Professional%20Certificates';

function CertificateThumbnail({
  cert,
  featured = false,
  onClick,
}: {
  cert: VisualCertificateItem;
  featured?: boolean;
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg border border-[#26313A] bg-[#11171C] transition-colors duration-150 hover:border-[#A0F2B8]/50 ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Inspect ${cert.title} certificate`}
        className="relative flex w-full flex-1 flex-col text-left"
      >
        {/* Neutral dark framing preserving the full uncropped certificate image */}
        <div
          className={`relative flex w-full items-center justify-center overflow-hidden bg-[#171D23] p-4 ${
            featured ? 'aspect-[16/10] sm:p-6' : 'aspect-[4/3]'
          }`}
        >
          {!failed ? (
            <img
              src={cert.imageUrl}
              alt={`${cert.title} — issued by ${cert.issuer}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
              className="max-h-full max-w-full rounded-sm object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded border border-[#26313A] bg-[#0B0F13] p-4 text-center">
              <FileText className="h-6 w-6 text-[#92A0AA]" aria-hidden="true" />
              <p className="font-mono text-xs text-[#E8EEF2]">{cert.title}</p>
              <p className="font-mono text-[11px] text-[#92A0AA]">
                Open original file on GitHub
              </p>
            </div>
          )}

          <span
            aria-hidden="true"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#26313A] bg-[#080B0E]/85 text-[#92A0AA] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 className="h-3.5 w-3.5 text-[#A0F2B8]" />
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <p className="font-mono text-[11px] text-[#92A0AA]">
              {cert.issuer} · {cert.group}
              {featured ? ' · Featured' : ''}
            </p>
            <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[#E8EEF2] transition-colors group-hover:text-[#A0F2B8] sm:text-base">
              {cert.title}
            </h3>
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between gap-2 border-t border-[#26313A]/80 px-4 py-2.5 font-mono text-[11px] sm:px-5">
        <a
          href={cert.githubFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#92A0AA] transition-colors hover:text-[#A0F2B8]"
        >
          <span>Original File</span>
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>

        {cert.courseArchiveUrl && (
          <a
            href={cert.courseArchiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#92A0AA] transition-colors hover:text-[#E8EEF2]"
          >
            Course PDFs
          </a>
        )}
      </div>
    </article>
  );
}

export function CertificatesSection({
  onOpenLightbox,
}: CertificatesSectionProps) {
  const [activeTab, setActiveTab] = useState<CertTab>('All');
  const [visualCerts, setVisualCerts] = useState<VisualCertificateItem[]>([]);
  const [pdfCerts, setPdfCerts] = useState<PdfCertificateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | undefined>(undefined);
  const [selectedIssuerFolder, setSelectedIssuerFolder] = useState<string>('All');

  useEffect(() => {
    let mounted = true;
    loadCertificatesData()
      .then((res) => {
        if (!mounted) return;
        setVisualCerts(res.visual.items);
        setPdfCerts(res.pdfs.items);
        setNotice(res.visual.notice);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredVisual = useMemo(() => {
    if (activeTab === 'Professional') {
      return visualCerts.filter((c) => c.group === 'Professional');
    }
    if (activeTab === 'Internship') {
      return visualCerts.filter((c) => c.group === 'Internship');
    }
    return visualCerts;
  }, [activeTab, visualCerts]);

  const issuerFolders = useMemo(() => {
    const unique = Array.from(new Set(pdfCerts.map((p) => p.issuerFolder))).sort();
    return ['All', ...unique];
  }, [pdfCerts]);

  const filteredPdfs = useMemo(() => {
    if (selectedIssuerFolder === 'All') return pdfCerts;
    return pdfCerts.filter((p) => p.issuerFolder === selectedIssuerFolder);
  }, [pdfCerts, selectedIssuerFolder]);

  const openVisualAt = (index: number) => {
    const slides: LightboxSlide[] = filteredVisual.map((cert) => ({
      id: cert.id,
      title: cert.title,
      subtitle: `${cert.issuer} · ${cert.group}`,
      imageUrl: cert.imageUrl,
      githubFileUrl: cert.githubFileUrl,
      secondaryLinkUrl: cert.courseArchiveUrl,
      secondaryLinkLabel: cert.courseArchiveUrl ? 'Browse Course PDFs' : undefined,
    }));
    onOpenLightbox(slides, index);
  };

  const tabs: { key: CertTab; label: string }[] = [
    { key: 'All', label: `All Visual (${visualCerts.length})` },
    {
      key: 'Professional',
      label: `Professional (${visualCerts.filter((c) => c.group === 'Professional').length})`,
    },
    {
      key: 'Internship',
      label: `Internships (${visualCerts.filter((c) => c.group === 'Internship').length})`,
    },
    { key: 'PDF Archive', label: `Course PDF Archive (${pdfCerts.length})` },
  ];

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs text-[#A0F2B8]">/credentials/archive</p>
            <h2
              id="certificates-heading"
              className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
            >
              Proof of curiosity.
              <span className="block text-[#A0F2B8]">Filed, not forgotten.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#92A0AA]">
              A visual vault of actual certificate files loaded from my GitHub
              repositories—complete with zoom inspection, original source links, and the
              full individual-course PDF index.
            </p>
          </div>

          <a
            href={CERT_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 self-start font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#A0F2B8] lg:self-end"
          >
            <span>Browse Certifications Repository</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Filter bar */}
        <div
          role="tablist"
          aria-label="Certificate archive views"
          className="mt-8 flex flex-wrap items-center gap-1.5 border-y border-[#26313A] py-3"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.key)}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 tabular-nums transition-colors duration-150 ${
                  active
                    ? 'border border-[#A0F2B8]/40 bg-[#A0F2B8]/15 text-[#A0F2B8]'
                    : 'border border-transparent text-[#92A0AA] hover:bg-[#11171C] hover:text-[#E8EEF2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {notice && (
          <p className="mt-4 font-mono text-xs text-[#92A0AA]" role="status">
            {notice}
          </p>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-72 animate-pulse rounded-lg border border-[#26313A] bg-[#11171C]"
              />
            ))}
          </div>
        )}

        {/* Visual Certificate Gallery */}
        {!loading && activeTab !== 'PDF Archive' && (
          <>
            {filteredVisual.length === 0 ? (
              <div className="mt-8 rounded-lg border border-[#26313A] bg-[#11171C] p-10 text-center">
                <p className="font-mono text-sm text-[#E8EEF2]">
                  No certificate files found in this category.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredVisual.map((cert, idx) => (
                  <CertificateThumbnail
                    key={cert.id}
                    cert={cert}
                    featured={activeTab === 'All' && idx === 0 && Boolean(cert.featured)}
                    onClick={() => openVisualAt(idx)}
                  />
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Full Individual Course PDF Archive from Certifications/Professional Certificates */}
        {!loading && activeTab === 'PDF Archive' && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              {issuerFolders.map((folder) => {
                const active = selectedIssuerFolder === folder;
                return (
                  <button
                    key={folder}
                    type="button"
                    onClick={() => setSelectedIssuerFolder(folder)}
                    className={`min-h-[34px] rounded-md border px-3 py-1 font-mono text-[11px] whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'border-[#A0F2B8]/50 bg-[#A0F2B8]/12 text-[#A0F2B8]'
                        : 'border-[#26313A] bg-[#11171C] text-[#92A0AA] hover:text-[#E8EEF2]'
                    }`}
                  >
                    {folder}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 divide-y divide-[#26313A]/80 rounded-lg border border-[#26313A] bg-[#11171C]">
              {filteredPdfs.map((pdf, idx) => (
                <a
                  key={pdf.id}
                  href={pdf.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-[#151C22]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#E8EEF2]">
                      <span className="mr-3 font-mono text-xs text-[#92A0AA] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {pdf.title}
                    </p>
                    <p className="mt-0.5 pl-7 font-mono text-[11px] text-[#92A0AA]">
                      {pdf.issuerFolder} · PDF
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[#A0F2B8] whitespace-nowrap shrink-0">
                    <span>Open PDF</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
