import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  FileBadge,
  Github,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  EXPERIENCE_ENTRIES,
  ExperienceEntry,
  JOURNEY_ATTITUDE_LINE,
} from '../data/experience';
import { PROJECTS, ProjectItem } from '../data/projects';

interface JourneySectionProps {
  onOpenProject: (project: ProjectItem) => void;
  onInspectCertificate: (entry: ExperienceEntry) => void;
}

export function JourneySection({
  onOpenProject,
  onInspectCertificate,
}: JourneySectionProps) {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCE_ENTRIES[0].id);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs text-[#A0F2B8]">journey.log</p>
            <h2
              id="journey-heading"
              className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
            >
              Verified internships & applied tracks.
            </h2>
          </div>

          <p className="max-w-lg font-mono text-xs leading-relaxed text-[#92A0AA] lg:text-right">
            “{JOURNEY_ATTITUDE_LINE}”
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#26313A] rounded-lg border border-[#26313A] bg-[#11171C]">
          {EXPERIENCE_ENTRIES.map((entry, idx) => {
            const isOpen = expandedId === entry.id;
            const linkedProject = entry.relatedProjectId
              ? PROJECTS.find((p) => p.id === entry.relatedProjectId)
              : undefined;

            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`journey-panel-${entry.id}`}
                  onClick={() => setExpandedId(isOpen ? '' : entry.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-150 hover:bg-[#151C22] sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#92A0AA] tabular-nums">
                      <span>{entry.dateRange}</span>
                      <span aria-hidden="true" className="text-[#26313A]">
                        ·
                      </span>
                      <span className="text-[#A0F2B8]">{entry.status}</span>
                    </div>

                    <h3 className="mt-1.5 text-lg font-semibold text-[#E8EEF2]">
                      {entry.role}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-[#92A0AA]">
                      {entry.organization}
                    </p>
                    <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#E8EEF2]/80">
                      {entry.summary}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#26313A] bg-[#080B0E] text-[#92A0AA]"
                  >
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#A0F2B8]" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`journey-panel-${entry.id}`}
                    className="border-t border-[#26313A]/70 bg-[#0C1014] px-5 py-5 sm:px-6"
                  >
                    <p className="font-mono text-xs text-[#A0F2B8]">
                      Logged Work & Outcomes
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#E8EEF2]/90">
                      {entry.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-1 font-mono text-xs text-[#A0F2B8]"
                          >
                            &gt;
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 font-mono text-xs text-[#92A0AA]">
                      <span className="text-[#E8EEF2]">Tools:</span>{' '}
                      {entry.skills.join(' · ')}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#26313A]/70 pt-4">
                      {entry.certificateImageUrl && (
                        <button
                          type="button"
                          onClick={() => onInspectCertificate(entry)}
                          className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#A0F2B8]/45 bg-[#A0F2B8]/10 px-3.5 py-2 font-mono text-xs text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#A0F2B8] hover:text-[#080B0E]"
                        >
                          <FileBadge className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>View Certificate</span>
                        </button>
                      )}

                      {entry.repoUrl && (
                        <a
                          href={entry.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[#26313A] bg-[#11171C] px-3.5 py-2 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Repository</span>
                        </a>
                      )}

                      {linkedProject && (
                        <button
                          type="button"
                          onClick={() => onOpenProject(linkedProject)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 py-2 font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#A0F2B8]"
                        >
                          <span>Related Case Study: {linkedProject.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
