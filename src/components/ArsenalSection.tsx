import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { ARSENAL_ATTITUDE_LINE, SKILL_CATEGORIES, SkillTool } from '../data/skills';

interface ArsenalSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

export function ArsenalSection({ onOpenProject }: ArsenalSectionProps) {
  const [selectedTool, setSelectedTool] = useState<{
    categoryTitle: string;
    tool: SkillTool;
  }>({
    categoryTitle: SKILL_CATEGORIES[0].title,
    tool: SKILL_CATEGORIES[0].tools[0],
  });

  const relatedProjects = selectedTool.tool.relatedProjectIds
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is ProjectItem => p !== undefined);

  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs text-[#A0F2B8]">arsenal</p>
            <h2
              id="arsenal-heading"
              className="headline-balance mt-3 text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
            >
              Tools I’ve learned to make things happen.
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#92A0AA] lg:text-right">
            “{ARSENAL_ATTITUDE_LINE}”
          </p>
        </div>

        {/* Interactive inspection bar — always readable, updates on click/focus */}
        <div className="mt-8 rounded-lg border border-[#26313A] bg-[#11171C] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs">
                <span className="text-[#A0F2B8]">{selectedTool.tool.name}</span>
                <span aria-hidden="true" className="text-[#26313A]">
                  ·
                </span>
                <span className="text-[#92A0AA]">{selectedTool.categoryTitle}</span>
                <span aria-hidden="true" className="text-[#26313A]">
                  ·
                </span>
                <span className="text-[#E8EEF2]/80">{selectedTool.tool.level}</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#E8EEF2]/90">
                {selectedTool.tool.note}
              </p>
            </div>

            {relatedProjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <span className="font-mono text-[11px] text-[#92A0AA]">Used in:</span>
                {relatedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-md border border-[#26313A] bg-[#080B0E] px-3 py-1 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 6 clean category cards — zero skill percentage bars */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-lg border border-[#26313A] bg-[#11171C] p-6"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#E8EEF2]">
                    {category.title}
                  </h3>
                  <span className="font-mono text-xs text-[#92A0AA] tabular-nums">
                    {category.index}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#92A0AA]">
                  {category.summary}
                </p>

                <ul className="mt-5 divide-y divide-[#26313A]/70">
                  {category.tools.map((tool) => {
                    const isSelected = selectedTool.tool.name === tool.name;
                    return (
                      <li key={tool.name}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTool({ categoryTitle: category.title, tool })
                          }
                          onMouseEnter={() =>
                            setSelectedTool({ categoryTitle: category.title, tool })
                          }
                          className={`flex min-h-[42px] w-full items-center justify-between gap-3 py-2 text-left transition-colors duration-150 ${
                            isSelected
                              ? 'text-[#A0F2B8]'
                              : 'text-[#E8EEF2] hover:text-[#A0F2B8]'
                          }`}
                        >
                          <span className="font-mono text-xs font-medium">
                            {tool.name}
                          </span>
                          <span className="font-mono text-[11px] text-[#92A0AA]">
                            {tool.level === 'Actively Learning' ? 'Learning' : 'Core'}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
