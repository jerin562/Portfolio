import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CertificationsSection } from './components/CertificationsSection';
import { CinematicIntro } from './components/CinematicIntro';
import { ContactSection } from './components/ContactSection';
import { CursorGlow } from './components/CursorGlow';
import { HeroAboutStage } from './components/HeroAboutStage';
import { JourneySection } from './components/JourneySection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { EDUCATION_DATA, PERSONAL_INFO } from './data/portfolioData';
import { useGitHubData } from './hooks/useGitHubData';
import { useResumeDownload } from './hooks/useResumeDownload';

const STORAGE_KEYS = {
  email: 'jm_portfolio_email_v2',
  mcaInstitution: 'jm_portfolio_mca_institution_v2',
};

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [email, setEmail] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.email) || PERSONAL_INFO.defaultEmail;
    } catch {
      return PERSONAL_INFO.defaultEmail;
    }
  });

  const [mcaInstitution, setMcaInstitution] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(STORAGE_KEYS.mcaInstitution) ||
        EDUCATION_DATA[0].defaultInstitution
      );
    } catch {
      return EDUCATION_DATA[0].defaultInstitution;
    }
  });

  const { user: githubUser, aurelRepo, loading: githubLoading, error: githubError } =
    useGitHubData(PERSONAL_INFO.githubUsername);

  const openResumeModal = useCallback(() => setResumeOpen(true), []);
  const { docxAvailable, pdfAvailable, downloading, triggerResumeDownload } =
    useResumeDownload(openResumeModal);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.email, email);
    } catch {
      // Ignore storage quota errors
    }
  }, [email]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.mcaInstitution, mcaInstitution);
    } catch {
      // Ignore storage quota errors
    }
  }, [mcaInstitution]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#05040A] text-[#F8F7FC] selection:bg-[#8B5CF6]/30 selection:text-[#F8F7FC]">
        {/* Subtle atmospheric film grain */}
        <div
          aria-hidden="true"
          className="film-grain-overlay pointer-events-none fixed inset-0 z-40"
        />

        <CinematicIntro onComplete={handleIntroComplete} />
        <CursorGlow />
        <Navbar />

        <main>
          <HeroAboutStage
            introComplete={introComplete}
            onDownloadResume={triggerResumeDownload}
            docxAvailable={docxAvailable}
            pdfAvailable={pdfAvailable}
            downloadingResume={downloading}
          />
          <ProjectsSection aurelRepo={aurelRepo} githubLoading={githubLoading} />
          <JourneySection
            mcaInstitution={mcaInstitution}
            onUpdateMcaInstitution={setMcaInstitution}
          />
          <SkillsSection />
          <CertificationsSection />
        </main>

        <ContactSection
          email={email}
          onUpdateEmail={setEmail}
          githubUser={githubUser}
          githubLoading={githubLoading}
          githubError={githubError}
          onResumeAction={triggerResumeDownload}
          onViewResume={openResumeModal}
          docxAvailable={docxAvailable}
          pdfAvailable={pdfAvailable}
          downloadingResume={downloading}
        />

        <ResumeModal
          open={resumeOpen}
          onClose={() => setResumeOpen(false)}
          email={email}
          mcaInstitution={mcaInstitution}
          docxAvailable={docxAvailable}
          pdfAvailable={pdfAvailable}
          downloading={downloading}
          onDownloadResume={triggerResumeDownload}
        />
      </div>
    </MotionConfig>
  );
}
