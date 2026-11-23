import { ExternalLink, ImageOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PhotoItem } from '../data/manifests';
import { loadPhotographyData } from '../lib/githubAssets';
import { LightboxSlide } from './LightboxModal';

interface PhotographySectionProps {
  onOpenLightbox: (slides: LightboxSlide[], startIndex: number) => void;
}

const PHOTO_REPO_URL =
  'https://github.com/Pavanateja2007-aiml/Certifications/tree/main/Interests/Photo%20Graphs';

function PhotoFrame({
  photo,
  onClick,
}: {
  photo: PhotoItem;
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="mb-5 break-inside-avoid overflow-hidden rounded-lg border border-[#26313A]/85 bg-[#0D1217]">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open photograph: ${photo.title}`}
        className="group relative block w-full text-left"
      >
        {!failed ? (
          <img
            src={photo.imageUrl}
            alt={photo.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-[#11171C] p-6 text-center">
            <ImageOff className="h-5 w-5 text-[#92A0AA]" aria-hidden="true" />
            <p className="font-mono text-xs text-[#92A0AA]">{photo.title}</p>
          </div>
        )}

        <figcaption className="flex items-center justify-between gap-2 border-t border-[#26313A]/70 px-3.5 py-2.5 font-mono text-[11px] text-[#92A0AA]">
          <span className="truncate text-[#E8EEF2]/85">{photo.title}</span>
          <span className="shrink-0">{photo.sublocation ?? photo.collection}</span>
        </figcaption>
      </button>
    </figure>
  );
}

export function PhotographySection({
  onOpenLightbox,
}: PhotographySectionProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | undefined>(undefined);
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadPhotographyData()
      .then((res) => {
        if (!mounted) return;
        setPhotos(res.items);
        setNotice(res.notice);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const seriesOptions = useMemo(() => {
    const labels = new Set<string>();
    photos.forEach((p) => labels.add(p.sublocation ?? p.collection));
    return ['All', ...Array.from(labels)];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (selectedSeries === 'All') return photos;
    return photos.filter(
      (p) => (p.sublocation ?? p.collection) === selectedSeries
    );
  }, [photos, selectedSeries]);

  const visiblePhotos =
    showAll || selectedSeries !== 'All'
      ? filteredPhotos
      : filteredPhotos.slice(0, 12);

  const openPhotoAt = (index: number) => {
    const slides: LightboxSlide[] = filteredPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      subtitle: photo.sublocation
        ? `${photo.collection} · ${photo.sublocation}`
        : photo.collection,
      imageUrl: photo.imageUrl,
      githubFileUrl: photo.githubFileUrl,
    }));
    onOpenLightbox(slides, index);
  };

  return (
    <section
      id="photography"
      aria-labelledby="photography-heading"
      className="border-b border-[#26313A] bg-[#06080A] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Deliberately quieter, personal editorial header distinct from technical sections */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-[#92A0AA]">Mode: Human</p>
          <h2
            id="photography-heading"
            className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
          >
            Outside the algorithm.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#E8EEF2]/80">
            Not everything needs a model. Some things just need to be noticed.
          </p>
          <blockquote className="mt-6 border-t border-[#26313A]/80 pt-5 text-sm leading-relaxed text-[#92A0AA]">
            “I chase moments, not perfection. The unexpected light, the wrong angle, the
            blurry shot. Sometimes that’s the photograph worth keeping.”
          </blockquote>
        </div>

        {/* Series filter + GitHub archive link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-[#26313A]/80 py-3">
          <div
            role="tablist"
            aria-label="Filter photography by folder series"
            className="flex flex-wrap items-center gap-1.5"
          >
            {seriesOptions.map((series) => {
              const active = selectedSeries === series;
              return (
                <button
                  key={series}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedSeries(series);
                    setShowAll(false);
                  }}
                  className={`min-h-[36px] rounded-md px-3 py-1 font-mono text-xs whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'border border-[#A0F2B8]/40 bg-[#A0F2B8]/12 text-[#A0F2B8]'
                      : 'border border-transparent text-[#92A0AA] hover:bg-[#11171C] hover:text-[#E8EEF2]'
                  }`}
                >
                  {series}
                </button>
              );
            })}
          </div>

          <a
            href={PHOTO_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[36px] items-center gap-1.5 font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#E8EEF2]"
          >
            <span>Source Folder on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {notice && (
          <p className="mt-4 font-mono text-xs text-[#92A0AA]" role="status">
            {notice}
          </p>
        )}

        {loading && (
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`mb-5 animate-pulse rounded-lg border border-[#26313A] bg-[#11171C] ${
                  idx % 2 === 0 ? 'h-64' : 'h-80'
                }`}
              />
            ))}
          </div>
        )}

        {!loading && visiblePhotos.length === 0 && (
          <div className="mt-10 rounded-lg border border-[#26313A] bg-[#11171C] p-10 text-center">
            <p className="font-mono text-sm text-[#E8EEF2]">
              No photographs available in this folder yet.
            </p>
          </div>
        )}

        {/* Aspect-ratio-preserving masonry gallery */}
        {!loading && visiblePhotos.length > 0 && (
          <>
            <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {visiblePhotos.map((photo, idx) => (
                <PhotoFrame
                  key={photo.id}
                  photo={photo}
                  onClick={() => openPhotoAt(idx)}
                />
              ))}
            </div>

            {selectedSeries === 'All' && filteredPhotos.length > 12 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="min-h-[42px] rounded-md border border-[#26313A] bg-[#11171C] px-5 py-2 font-mono text-xs text-[#E8EEF2] transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                >
                  {showAll
                    ? 'Show Fewer Frames'
                    : `Load Remaining ${filteredPhotos.length - 12} Frames`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
