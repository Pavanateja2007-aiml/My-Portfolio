import { ExternalLink, Github, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ProjectItem } from '../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040608]/85 p-4 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#26313A] bg-[#0E1318]">
        {/* Sticky modal header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#26313A] bg-[#11171C] px-6 py-5">
          <div>
            <p className="font-mono text-xs text-[#92A0AA] tabular-nums">
              Project {project.index} · {project.category} ·{' '}
              <span className="text-[#A0F2B8]">{project.status}</span>
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 text-2xl font-bold tracking-tight text-[#E8EEF2]"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[#92A0AA]">{project.subtitle}</p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#26313A] text-[#92A0AA] transition-colors hover:border-[#A0F2B8]/60 hover:text-[#E8EEF2]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable case study body */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          <div className="font-mono text-xs text-[#92A0AA]">
            <span className="text-[#E8EEF2]">Stack:</span> {project.stack.join(' · ')}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
                01. Problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
                02. Why I Built It
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
                {caseStudy.whyIBuiltIt}
              </p>
            </div>
          </div>

          <div className="border-t border-[#26313A]/80 pt-5">
            <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
              03. Approach
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
              {caseStudy.approach}
            </p>
          </div>

          <div className="border-t border-[#26313A]/80 pt-5">
            <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
              04. Architecture & Workflow
            </h4>
            <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#E8EEF2]/90">
              {caseStudy.architecture.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs text-[#92A0AA] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-t border-[#26313A]/80 pt-5">
            <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
              05. Implementation
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
              {caseStudy.implementation}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-[#26313A]/80 pt-5 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
                06. Challenges & Bugs
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
                {caseStudy.challengesAndBugs}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
                07. What I Learned
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
                {caseStudy.whatILearned}
              </p>
            </div>
          </div>

          <div className="border-t border-[#26313A]/80 pt-5">
            <h4 className="font-mono text-xs font-medium text-[#A0F2B8]">
              08. Future Improvements
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#E8EEF2]/90">
              {caseStudy.futureImprovements}
            </p>
          </div>
        </div>

        {/* Sticky footer with verified repository / live demo links */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#26313A] bg-[#11171C] px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#A0F2B8]/50 bg-[#A0F2B8]/10 px-4 py-2 font-mono text-xs font-medium text-[#A0F2B8] whitespace-nowrap shrink-0 transition-colors hover:bg-[#A0F2B8] hover:text-[#080B0E]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>View on GitHub</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#26313A] bg-[#151C22] px-4 py-2 font-mono text-xs text-[#E8EEF2] whitespace-nowrap shrink-0 transition-colors hover:border-[#A0F2B8]/50 hover:text-[#A0F2B8]"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open Live Demo</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-3 py-2 font-mono text-xs text-[#92A0AA] transition-colors hover:text-[#E8EEF2]"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
