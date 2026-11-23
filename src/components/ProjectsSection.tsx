import { ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="builds"
      aria-labelledby="builds-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs text-[#A0F2B8]">~/experiments</p>
            <h2
              id="builds-heading"
              className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
            >
              Ideas are easy.
              <span className="block text-[#A0F2B8]">
                Making them work is the experiment.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#92A0AA]">
              Selected verified builds, research experiments, and prototypes from my
              repositories. Inspect any case study for the problem, architecture, bugs,
              and honest lessons learned.
            </p>
          </div>

          <p className="font-mono text-xs text-[#92A0AA] lg:text-right">
            “I have a habit of turning questions into projects.”
          </p>
        </div>

        {/* Functional category filter bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-8 flex flex-wrap items-center gap-1.5 border-y border-[#26313A] py-3"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'bg-[#A0F2B8]/15 text-[#A0F2B8] border border-[#A0F2B8]/40'
                    : 'border border-transparent text-[#92A0AA] hover:bg-[#11171C] hover:text-[#E8EEF2]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Data-driven project cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: Math.min(idx * 0.04, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between rounded-lg border border-[#26313A] bg-[#11171C] p-6 transition-colors duration-150 hover:border-[#A0F2B8]/45 hover:bg-[#151C22]"
            >
              <div>
                {/* Quiet unboxed metadata line — no pill sandwiches */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#92A0AA]">
                  <span className="tabular-nums">
                    {project.index} · {project.category}
                  </span>
                  <span className="text-[#A0F2B8]/90">{project.status}</span>
                </div>

                {/* Clickable title opens full case study */}
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#E8EEF2]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-left transition-colors hover:text-[#A0F2B8] focus-visible:outline-[#A0F2B8]"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="mt-1 font-mono text-xs text-[#92A0AA]">
                  {project.subtitle}
                </p>

                {/* Honest conceptual architecture preview (explicitly labeled, never faked as a screenshot) */}
                <div className="mt-5 rounded-md border border-[#26313A]/90 bg-[#080B0E] p-4">
                  <p className="font-mono text-[11px] text-[#92A0AA]">
                    {project.schematicLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-[#E8EEF2]">
                    <span>{project.schematicNodes[0]}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-[#A0F2B8]"
                      aria-hidden="true"
                    />
                    <span>{project.schematicNodes[1]}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-[#A0F2B8]"
                      aria-hidden="true"
                    />
                    <span className="text-[#A0F2B8]">{project.schematicNodes[2]}</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#E8EEF2]/85">
                  {project.summary}
                </p>

                {/* Stack rendered as clean unboxed typographic list */}
                <p className="mt-4 font-mono text-xs leading-relaxed text-[#92A0AA]">
                  {project.stack.join(' · ')}
                </p>
              </div>

              {/* Card footer actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#26313A]/80 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 font-mono text-xs font-medium text-[#A0F2B8] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
                >
                  <span>Inspect Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-1.5 font-mono text-xs text-[#92A0AA] whitespace-nowrap shrink-0 transition-colors hover:text-[#E8EEF2]"
                    aria-label={`Open ${project.title} GitHub repository`}
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Repository</span>
                  </a>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:text-[#A0F2B8]"
                      aria-label={`Open ${project.title} live deployment`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
