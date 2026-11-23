import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AchievementsCurrentlySection } from './components/AchievementsCurrentlySection';
import { ArsenalSection } from './components/ArsenalSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactFooter } from './components/ContactFooter';
import { Hero } from './components/Hero';
import { JourneySection } from './components/JourneySection';
import { LightboxModal, LightboxSlide } from './components/LightboxModal';
import { Navbar } from './components/Navbar';
import { PhotographySection } from './components/PhotographySection';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEntry } from './data/experience';
import { ProjectItem } from './data/projects';

interface ActiveLightboxState {
  slides: LightboxSlide[];
  index: number;
  mode: 'certificate' | 'photography';
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [lightbox, setLightbox] = useState<ActiveLightboxState | null>(null);

  const handleInspectExperienceCertificate = (entry: ExperienceEntry) => {
    if (!entry.certificateImageUrl || !entry.certificateGithubUrl) return;
    setLightbox({
      mode: 'certificate',
      index: 0,
      slides: [
        {
          id: entry.id,
          title: `${entry.role} — ${entry.organization}`,
          subtitle: `${entry.dateRange} · ${entry.status}`,
          imageUrl: entry.certificateImageUrl,
          githubFileUrl: entry.certificateGithubUrl,
        },
      ],
    });
  };

  return (
    <>
      <div className="min-h-screen bg-[#080B0E] text-[#E8EEF2]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#A0F2B8] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-[#080B0E]"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero />
          <AboutSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <ArsenalSection onOpenProject={setSelectedProject} />
          <JourneySection
            onOpenProject={setSelectedProject}
            onInspectCertificate={handleInspectExperienceCertificate}
          />
          <CertificatesSection
            onOpenLightbox={(slides, startIndex) =>
              setLightbox({ slides, index: startIndex, mode: 'certificate' })
            }
          />
          <PhotographySection
            onOpenLightbox={(slides, startIndex) =>
              setLightbox({ slides, index: startIndex, mode: 'photography' })
            }
          />
          <AchievementsCurrentlySection />
          <ContactFooter />
        </main>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <LightboxModal
          slides={lightbox?.slides ?? []}
          activeIndex={lightbox?.index ?? null}
          mode={lightbox?.mode ?? 'certificate'}
          onClose={() => setLightbox(null)}
          onChangeIndex={(nextIndex) =>
            setLightbox((prev) => (prev ? { ...prev, index: nextIndex } : null))
          }
        />
      </div>
    </>
  );
}
