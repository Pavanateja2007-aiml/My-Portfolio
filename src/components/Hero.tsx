import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PROFILE, TERMINAL_STATUS_ROWS } from '../data/profile';

export function Hero() {
  const [selectedRowKey, setSelectedRowKey] = useState<string>(
    TERMINAL_STATUS_ROWS[0].key
  );
  const [portraitFailed, setPortraitFailed] = useState(false);

  const activeRow =
    TERMINAL_STATUS_ROWS.find((row) => row.key === selectedRowKey) ??
    TERMINAL_STATUS_ROWS[0];

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative border-b border-[#26313A] bg-lab-grid"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Editorial headline, lead copy, CTAs, interactive micro-terminal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#92A0AA]">
                <span className="text-[#A0F2B8]">{PROFILE.brandSubtitle}</span>
                <span aria-hidden="true" className="text-[#26313A]">
                  /
                </span>
                <span>{PROFILE.heroKicker}</span>
              </div>

              <h1 className="headline-balance text-4xl font-bold tracking-tight text-[#E8EEF2] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                <span className="block">{PROFILE.heroHeadlineLine1}</span>
                <span className="mt-1 block text-[#A0F2B8]">
                  {PROFILE.heroHeadlineLine2}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#92A0AA] sm:text-lg">
                {PROFILE.heroDescription}
              </p>

              {/* Primary + secondary actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#builds"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#A0F2B8] bg-[#A0F2B8]/12 px-5 py-2.5 font-mono text-xs font-medium tracking-wide text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#A0F2B8] hover:text-[#080B0E]"
                >
                  <span>Explore Projects</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:text-[#A0F2B8]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#92A0AA]" aria-hidden="true" />
                </a>

                <a
                  href="#connect"
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#E8EEF2]"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Contact</span>
                </a>
              </div>
            </div>

            {/* Compact interactive micro-terminal (legible, non-blocking, inspectable rows) */}
            <div className="mt-10 rounded-lg border border-[#26313A] bg-[#11171C]/95 p-5">
              <div className="mb-3 flex items-center justify-between border-b border-[#26313A]/80 pb-2.5 font-mono text-xs">
                <span className="text-[#E8EEF2]">
                  <span className="text-[#A0F2B8]">$</span> curiosity.exe --status
                </span>
                <span className="text-[#92A0AA]">Select any row to inspect</span>
              </div>

              <div role="listbox" aria-label="Curiosity status entries" className="space-y-1">
                {TERMINAL_STATUS_ROWS.map((row) => {
                  const isSelected = row.key === selectedRowKey;
                  return (
                    <button
                      key={row.key}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => setSelectedRowKey(row.key)}
                      className={`group flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-xs transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#151C22] text-[#E8EEF2]'
                          : 'text-[#92A0AA] hover:bg-[#151C22]/60 hover:text-[#E8EEF2]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={isSelected ? 'text-[#A0F2B8]' : 'text-[#26313A] group-hover:text-[#92A0AA]'}
                      >
                        &gt;
                      </span>
                      <span className="shrink-0">{row.key}</span>
                      <span
                        aria-hidden="true"
                        className="flex-1 border-b border-dotted border-[#26313A] mx-1 translate-y-[-2px]"
                      />
                      <span
                        className={`shrink-0 ${
                          isSelected ? 'text-[#A0F2B8]' : 'text-[#E8EEF2]/80'
                        }`}
                      >
                        {row.value}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 border-t border-[#26313A]/80 pt-3 font-mono text-xs leading-relaxed text-[#92A0AA]">
                <span className="text-[#A0F2B8]">{activeRow.key}:</span> {activeRow.detail}
              </p>
            </div>
          </motion.div>

          {/* Right column: Dominant visual anchor — User's original monochrome portrait */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="relative flex-1 overflow-hidden rounded-xl border border-[#26313A] bg-[#050709] aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:min-h-[540px]">
              {!portraitFailed ? (
                <img
                  src={PROFILE.portraitSrc}
                  alt={PROFILE.portraitAlt}
                  width={764}
                  height={1024}
                  fetchPriority="high"
                  onError={() => setPortraitFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center p-8 text-center">
                  <p className="font-mono text-xs text-[#A0F2B8]">PORTRAIT ASSET EXPECTED</p>
                  <p className="mt-2 text-sm text-[#92A0AA]">
                    Place portrait image at <code className="text-[#E8EEF2]">/public/images/pavanateja-portrait.png</code>
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B0E]/55 via-transparent to-transparent"
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-wide text-[#92A0AA]">
              <span>PORTRAIT / 001</span>
              <span>{PROFILE.fullName}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
