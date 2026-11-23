import { ArrowUpRight } from 'lucide-react';
import { CURRENTLY_ITEMS, VERIFIED_ACHIEVEMENTS } from '../data/profile';

export function AchievementsCurrentlySection() {
  return (
    <section
      id="currently"
      aria-labelledby="achievements-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Verified Achievements column */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs text-[#A0F2B8]">milestones</p>
            <h2
              id="achievements-heading"
              className="headline-balance mt-3 text-2xl font-bold tracking-tight text-[#E8EEF2] sm:text-3xl"
            >
              Verified milestones.
            </h2>

            <div className="mt-6 space-y-4">
              {VERIFIED_ACHIEVEMENTS.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-[#26313A] bg-[#11171C] p-5"
                >
                  <p className="font-mono text-xs text-[#92A0AA]">{item.context}</p>
                  <h3 className="mt-1.5 text-base font-semibold text-[#E8EEF2] tabular-nums">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#92A0AA]">
                    {item.detail}
                  </p>
                  {item.internalAnchor && item.linkLabel && (
                    <a
                      href={item.internalAnchor}
                      className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-[#A0F2B8] transition-opacity hover:opacity-80"
                    >
                      <span>{item.linkLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* CURRENTLY.EXE easily-updateable status panel */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs text-[#A0F2B8]">currently.exe</p>
            <h2 className="headline-balance mt-3 text-2xl font-bold tracking-tight text-[#E8EEF2] sm:text-3xl">
              Active learning & build queue.
            </h2>

            <div className="mt-6 rounded-lg border border-[#26313A] bg-[#11171C] p-6">
              <div className="flex items-center justify-between border-b border-[#26313A] pb-3 font-mono text-xs text-[#92A0AA]">
                <span>Active Focus</span>
                <span>Status</span>
              </div>

              <ul className="divide-y divide-[#26313A]/70">
                {CURRENTLY_ITEMS.map((item) => (
                  <li key={item.id} className="py-4 first:pt-4 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#E8EEF2]">
                        {item.topic}
                      </h3>
                      <span className="font-mono text-xs text-[#A0F2B8]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#92A0AA]">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
