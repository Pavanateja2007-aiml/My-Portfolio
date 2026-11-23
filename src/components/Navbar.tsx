import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PROFILE } from '../data/profile';

export interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'builds', label: 'Builds' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'journey', label: 'Journey' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'photography', label: 'Photography' },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = [...NAV_ITEMS.map((item) => item.id), 'connect'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.45],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#26313A]/90 bg-[#080B0E]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand mark */}
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-wider text-[#A0F2B8] whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          {PROFILE.brandWordmark}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-xs font-mono tracking-wide whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#E8EEF2]'
                    : 'text-[#92A0AA] hover:text-[#E8EEF2]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-px bg-[#A0F2B8]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#connect"
            className="hidden sm:inline-flex items-center justify-center rounded-md border border-[#A0F2B8]/50 bg-[#A0F2B8]/10 px-4 py-1.5 font-mono text-xs font-medium text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#A0F2B8] hover:text-[#080B0E]"
          >
            Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#26313A] text-[#E8EEF2] md:hidden transition-colors hover:border-[#A0F2B8]/60 hover:text-[#A0F2B8]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Accessible mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="border-t border-[#26313A] bg-[#0B0F13] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {[...NAV_ITEMS, { id: 'connect', label: 'Connect' }].map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[44px] items-center justify-between rounded-md px-3 font-mono text-sm transition-colors ${
                    isActive
                      ? 'bg-[#151C22] text-[#A0F2B8]'
                      : 'text-[#92A0AA] hover:bg-[#11171C] hover:text-[#E8EEF2]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#A0F2B8]">Active</span>}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
