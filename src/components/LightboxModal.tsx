import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderOpen,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface LightboxSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  githubFileUrl: string;
  secondaryLinkUrl?: string;
  secondaryLinkLabel?: string;
}

interface LightboxModalProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  mode: 'certificate' | 'photography';
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function LightboxModal({
  slides,
  activeIndex,
  mode,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [imgError, setImgError] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null && slides[activeIndex] !== undefined;
  const activeSlide = isOpen ? slides[activeIndex] : null;

  useEffect(() => {
    setZoom(1);
    setImgError(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && slides.length > 1) {
        onChangeIndex((activeIndex + 1) % slides.length);
      } else if (event.key === 'ArrowLeft' && slides.length > 1) {
        onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
      } else if (mode === 'certificate' && (event.key === '+' || event.key === '=')) {
        setZoom((z) => Math.min(2, Number((z + 0.5).toFixed(1))));
      } else if (mode === 'certificate' && event.key === '-') {
        setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, slides.length, mode, onClose, onChangeIndex]);

  if (!isOpen || !activeSlide || activeIndex === null) return null;

  const handlePrev = () =>
    onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
  const handleNext = () => onChangeIndex((activeIndex + 1) % slides.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeSlide.title}
      className="fixed inset-0 z-50 flex flex-col bg-[#040608]/94 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#26313A] bg-[#0B0F13]/95 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono text-xs text-[#92A0AA] tabular-nums">
            <span className="text-[#A0F2B8]">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(slides.length).padStart(2, '0')}
            </span>
            {activeSlide.subtitle && (
              <>
                <span aria-hidden="true" className="text-[#26313A]">
                  ·
                </span>
                <span className="truncate">{activeSlide.subtitle}</span>
              </>
            )}
          </div>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-[#E8EEF2] sm:text-base">
            {activeSlide.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {mode === 'certificate' && (
            <div className="hidden sm:flex items-center gap-1 rounded-md border border-[#26313A] bg-[#11171C] p-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))))}
                disabled={zoom <= 1}
                aria-label="Zoom out"
                className="inline-flex h-8 w-8 items-center justify-center rounded text-[#E8EEF2] transition-colors hover:bg-[#151C22] disabled:opacity-35"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="min-w-[44px] text-center font-mono text-xs text-[#92A0AA] tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2, Number((z + 0.5).toFixed(1))))}
                disabled={zoom >= 2}
                aria-label="Zoom in"
                className="inline-flex h-8 w-8 items-center justify-center rounded text-[#E8EEF2] transition-colors hover:bg-[#151C22] disabled:opacity-35"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          )}

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#26313A] bg-[#11171C] text-[#E8EEF2] transition-colors hover:border-[#A0F2B8]/60 hover:text-[#A0F2B8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main media viewport */}
      <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        {slides.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous item"
            className="fixed left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#26313A] bg-[#0B0F13]/90 text-[#E8EEF2] transition-colors hover:border-[#A0F2B8] hover:text-[#A0F2B8] sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          className={`flex max-h-full max-w-5xl items-center justify-center rounded-lg ${
            mode === 'certificate'
              ? 'border border-[#26313A] bg-[#1A2026] p-3 sm:p-5'
              : ''
          }`}
        >
          {!imgError ? (
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              style={{
                transform: zoom !== 1 ? `scale(${zoom})` : undefined,
                transformOrigin: 'center center',
              }}
              className="max-h-[72vh] w-auto max-w-full rounded object-contain transition-transform duration-150"
            />
          ) : (
            <div className="flex min-h-[260px] min-w-[280px] flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="font-mono text-xs text-[#A0F2B8]">
                Unable to load image directly
              </p>
              <p className="max-w-sm text-sm text-[#92A0AA]">
                GitHub raw media may be temporarily throttled. You can open the original
                verified file directly on GitHub below.
              </p>
            </div>
          )}
        </div>

        {slides.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next item"
            className="fixed right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#26313A] bg-[#0B0F13]/90 text-[#E8EEF2] transition-colors hover:border-[#A0F2B8] hover:text-[#A0F2B8] sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Bottom footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#26313A] bg-[#0B0F13]/95 px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] text-[#92A0AA]">
          Use ← / → arrows to navigate · Esc to close
          {mode === 'certificate' ? ' · + / - to zoom' : ''}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {activeSlide.secondaryLinkUrl && activeSlide.secondaryLinkLabel && (
            <a
              href={activeSlide.secondaryLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[#26313A] bg-[#11171C] px-3 py-1.5 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
            >
              <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{activeSlide.secondaryLinkLabel}</span>
            </a>
          )}

          <a
            href={activeSlide.githubFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[#A0F2B8]/50 bg-[#A0F2B8]/10 px-3.5 py-1.5 font-mono text-xs text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#A0F2B8] hover:text-[#080B0E]"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Open Original File</span>
          </a>
        </div>
      </div>
    </div>
  );
}
