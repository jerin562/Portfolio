import { useEffect } from 'react';
import { Download, ExternalLink, Printer, X } from 'lucide-react';
import {
  ABOUT_COPY,
  CERTIFICATIONS,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  LANGUAGES,
  PERSONAL_INFO,
  SOFT_SKILLS,
  TECHNICAL_SKILL_CATEGORIES,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  mcaInstitution: string;
  docxAvailable: boolean;
  pdfAvailable: boolean;
  downloading: boolean;
  onDownloadResume: (preferred?: 'docx' | 'pdf') => void;
}

export function ResumeModal({
  open,
  onClose,
  email,
  mcaInstitution,
  docxAvailable,
  pdfAvailable,
  downloading,
  onDownloadResume,
}: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0D0A16] p-6 sm:p-8 text-[#F8F7FC] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 id="resume-modal-title" className="font-display text-2xl sm:text-3xl font-bold">
              {PERSONAL_INFO.fullName}
            </h2>
            <p className="mt-1 text-sm text-[#C4B5FD]">
              MCA Student (AI &amp; ML, Cloud Computing) · HR Assistant
            </p>
            <p className="mt-2 text-xs text-[#9691A6]">
              {PERSONAL_INFO.location} · {PERSONAL_INFO.phoneDisplay} · {email}
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
            {docxAvailable && (
              <button
                type="button"
                onClick={() => onDownloadResume('docx')}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-4 py-2 text-xs font-medium text-[#F8F7FC] hover:bg-[#A855F7] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{downloading ? 'Preparing...' : 'Download DOCX'}</span>
              </button>
            )}
            {pdfAvailable && (
              <button
                type="button"
                onClick={() => onDownloadResume('pdf')}
                disabled={downloading}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap disabled:opacity-60 ${
                  docxAvailable
                    ? 'border border-white/15 bg-white/5 text-[#C4B5FD] hover:border-[#8B5CF6]/60 hover:text-[#F8F7FC]'
                    : 'bg-[#8B5CF6] text-[#F8F7FC] hover:bg-[#A855F7]'
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-[#8B5CF6]/50 bg-[#8B5CF6]/15 px-4 py-2 text-xs font-medium text-[#F8F7FC] hover:bg-[#8B5CF6]/30 transition-colors whitespace-nowrap"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#9691A6] hover:text-[#F8F7FC] hover:border-white/25 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-7 text-sm">
          <section>
            <h3 className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] uppercase">
              Professional Summary
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#9691A6]">
              {ABOUT_COPY.resumeSummary}
            </p>
          </section>

          <section>
            <h3 className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] uppercase">
              Professional Experience
            </h3>
            {EXPERIENCE_DATA.map((exp) => (
              <div key={exp.role} className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#F8F7FC]">
                    {exp.role} — {exp.organization}
                  </p>
                  <p className="text-xs text-[#9691A6]">{exp.period}</p>
                </div>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#9691A6]">
                  {exp.responsibilities.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] uppercase">
              Education
            </h3>
            <div className="mt-3 space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#F8F7FC]">{edu.degree}</p>
                    <p className="text-xs text-[#9691A6]">
                      {edu.editableInstitution ? mcaInstitution : edu.defaultInstitution} ·{' '}
                      {edu.focus}
                    </p>
                  </div>
                  <p className="text-xs text-[#C4B5FD]">
                    {edu.period} · {edu.status}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] uppercase">
              Technical &amp; Soft Skills
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TECHNICAL_SKILL_CATEGORIES.map((cat) => (
                <div key={cat.number}>
                  <p className="font-medium text-[#F8F7FC]">{cat.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#9691A6]">
                    {cat.items.join(' · ')}
                  </p>
                </div>
              ))}
              <div className="sm:col-span-2">
                <p className="font-medium text-[#F8F7FC]">Soft Skills</p>
                <p className="mt-1 text-xs leading-relaxed text-[#9691A6]">
                  {SOFT_SKILLS.join(' · ')}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-medium text-[#F8F7FC]">Languages</p>
                <p className="mt-1 text-xs leading-relaxed text-[#9691A6]">
                  {LANGUAGES.join(' · ')}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] uppercase">
              Certifications
            </h3>
            <ul className="mt-2 space-y-1 text-xs text-[#9691A6]">
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  · {c.title} — {c.issuer}
                </li>
              ))}
            </ul>
          </section>

          <div className="no-print flex flex-wrap gap-4 border-t border-white/10 pt-4 text-xs">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C4B5FD] hover:text-[#F8F7FC]"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C4B5FD] hover:text-[#F8F7FC]"
            >
              <span>GitHub (@{PERSONAL_INFO.githubUsername})</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
