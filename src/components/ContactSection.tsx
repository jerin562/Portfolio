import { FormEvent, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Send,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  buildMailtoUrl,
  GitHubUserSummary,
  isValidEmail,
  validateContactForm,
} from '../utils/portfolioLogic';

interface ContactSectionProps {
  email: string;
  onUpdateEmail: (nextEmail: string) => void;
  githubUser: GitHubUserSummary | null;
  githubLoading: boolean;
  githubError: string | null;
  onResumeAction: (preferred?: 'docx' | 'pdf') => void;
  onViewResume: () => void;
  docxAvailable: boolean;
  pdfAvailable: boolean;
  downloadingResume: boolean;
}

export function ContactSection({
  email,
  onUpdateEmail,
  githubUser,
  githubLoading,
  githubError,
  onResumeAction,
  onViewResume,
  docxAvailable,
  pdfAvailable,
  downloadingResume,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [draftEmail, setDraftEmail] = useState(email);
  const [emailEditError, setEmailEditError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [draftPreparedUrl, setDraftPreparedUrl] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleSaveEmail = () => {
    const trimmed = draftEmail.trim();
    if (!isValidEmail(trimmed)) {
      setEmailEditError('Enter a valid email address.');
      return;
    }
    setEmailEditError(null);
    onUpdateEmail(trimmed);
    setEditingEmail(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      name,
      email: senderEmail,
      message,
    });
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setDraftPreparedUrl(null);
      return;
    }
    setFormErrors({});
    const mailtoUrl = buildMailtoUrl(email, {
      name,
      email: senderEmail,
      message,
    });
    setDraftPreparedUrl(mailtoUrl);
    window.location.href = mailtoUrl;
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-16 overflow-hidden border-t border-white/[0.06] bg-[#05040A] pt-24 pb-12 lg:pt-32"
    >
      {/* Subtle purple glow that expands behind final headline */}
      <motion.div
        aria-hidden="true"
        initial={prefersReduced ? false : { scale: 0.75, opacity: 0.15 }}
        whileInView={{ scale: 1.08, opacity: 0.5 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="purple-radial-aura pointer-events-none absolute left-1/4 top-12 h-[380px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top CTA block */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2
            id="contact-heading"
            className="font-display text-3xl font-bold tracking-tight text-[#F8F7FC] sm:text-5xl text-balance"
          >
            LET&apos;S CREATE SOMETHING{' '}
            <span className="purple-text-gradient">MEANINGFUL.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#9691A6]">
            &ldquo;I&apos;m always interested in meaningful ideas, collaborations and
            opportunities. Let&apos;s connect.&rdquo;
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#8B5CF6] px-6 py-3.5 font-grotesk text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#F8F7FC] shadow-[0_0_32px_rgba(139,92,246,0.45)] hover:bg-[#A855F7] transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>COPIED EMAIL</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onResumeAction()}
              disabled={downloadingResume}
              className="inline-flex items-center gap-2 rounded-lg border border-[#8B5CF6]/55 bg-[#0D0A16] px-5 py-3.5 font-grotesk text-xs font-semibold tracking-[0.14em] text-[#C4B5FD] hover:border-[#A855F7] hover:text-[#F8F7FC] transition-colors whitespace-nowrap disabled:opacity-60"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloadingResume ? 'PREPARING...' : 'DOWNLOAD RESUME'}</span>
            </button>

            {docxAvailable && pdfAvailable && (
              <button
                type="button"
                onClick={() => onResumeAction('pdf')}
                disabled={downloadingResume}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-3.5 font-grotesk text-xs font-semibold tracking-[0.14em] text-[#C4B5FD] hover:border-[#8B5CF6]/55 hover:text-[#F8F7FC] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                <span>PDF</span>
              </button>
            )}

            <button
              type="button"
              onClick={onViewResume}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-3.5 font-grotesk text-xs font-semibold tracking-[0.14em] text-[#9691A6] hover:border-[#8B5CF6]/55 hover:text-[#F8F7FC] transition-colors whitespace-nowrap"
            >
              <span>VIEW RESUME</span>
            </button>
          </div>
        </motion.div>

        {/* Three Columns */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-14 md:grid-cols-12">
          {/* COLUMN 01 — CONTACT */}
          <div className="md:col-span-4 space-y-5">
            <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
              CONTACT
            </p>

            <div>
              <p className="text-xs text-[#9691A6]">Email</p>
              {editingEmail ? (
                <div className="mt-1.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor="editable-contact-email" className="sr-only">
                      Edit portfolio contact email
                    </label>
                    <input
                      id="editable-contact-email"
                      type="email"
                      value={draftEmail}
                      onChange={(e) => setDraftEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEmail();
                        if (e.key === 'Escape') {
                          setDraftEmail(email);
                          setEmailEditError(null);
                          setEditingEmail(false);
                        }
                      }}
                      className="w-full rounded-lg border border-[#8B5CF6]/60 bg-[#0D0A16] px-3 py-1.5 text-sm text-[#F8F7FC] focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveEmail}
                      className="rounded-lg bg-[#8B5CF6] px-3 py-1.5 text-xs font-medium text-[#F8F7FC] hover:bg-[#A855F7] whitespace-nowrap"
                    >
                      Save
                    </button>
                  </div>
                  {emailEditError && (
                    <p className="text-xs text-rose-400">{emailEditError}</p>
                  )}
                </div>
              ) : (
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#F8F7FC] hover:text-[#C4B5FD] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#8B5CF6]" />
                    <span>{email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftEmail(email);
                      setEditingEmail(true);
                    }}
                    aria-label="Edit contact email address"
                    className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-[#9691A6] hover:text-[#F8F7FC] hover:bg-white/[0.05] transition-colors"
                  >
                    <Pencil className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs text-[#9691A6]">Phone</p>
              <a
                href={PERSONAL_INFO.phoneHref}
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#F8F7FC] hover:text-[#C4B5FD] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#8B5CF6]" />
                <span>{PERSONAL_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div>
              <p className="text-xs text-[#9691A6]">Location</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#F8F7FC]">
                <MapPin className="h-4 w-4 text-[#8B5CF6]" />
                <span>{PERSONAL_INFO.location}</span>
              </p>
            </div>
          </div>

          {/* COLUMN 02 — SOCIAL MEDIA */}
          <div className="md:col-span-3 space-y-5">
            <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
              SOCIAL MEDIA
            </p>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#F8F7FC] hover:text-[#C4B5FD] transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-[#8B5CF6]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#F8F7FC] hover:text-[#C4B5FD] transition-colors"
                >
                  <Github className="h-4 w-4 text-[#8B5CF6]" />
                  <span>GitHub (@{PERSONAL_INFO.githubUsername})</span>
                </a>
              </li>
            </ul>

            <div className="rounded-xl border border-white/[0.07] bg-[#0D0A16] p-3.5 text-xs">
              <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C4B5FD]">
                GitHub Profile
              </p>
              {githubLoading ? (
                <p className="mt-1.5 text-[#9691A6]">Loading public profile...</p>
              ) : githubUser ? (
                <div className="mt-1.5 space-y-1 text-[#9691A6]">
                  <p className="text-[#F8F7FC] font-medium">{githubUser.name}</p>
                  <p className="tabular-nums">
                    @{githubUser.login}
                    {githubUser.publicRepos !== null
                      ? ` · ${githubUser.publicRepos} public repos`
                      : ''}
                    {githubUser.followers !== null
                      ? ` · ${githubUser.followers} followers`
                      : ''}
                  </p>
                </div>
              ) : (
                <p className="mt-1.5 text-[#9691A6]">
                  {githubError ?? 'Visit github.com/jerin562 for repositories.'}
                </p>
              )}
            </div>
          </div>

          {/* COLUMN 03 — LET'S CONNECT */}
          <div className="md:col-span-5">
            <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
              LET&apos;S CONNECT
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="contact-name" className="block text-xs text-[#9691A6] mb-1">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-[#0D0A16] px-3.5 py-2.5 text-sm text-[#F8F7FC] placeholder:text-[#9691A6]/50 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-rose-400">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs text-[#9691A6] mb-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-[#0D0A16] px-3.5 py-2.5 text-sm text-[#F8F7FC] placeholder:text-[#9691A6]/50 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-rose-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-[#9691A6] mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share an idea, opportunity, or collaboration..."
                  className="w-full rounded-lg border border-white/10 bg-[#0D0A16] px-3.5 py-2.5 text-sm text-[#F8F7FC] placeholder:text-[#9691A6]/50 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-rose-400">{formErrors.message}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#8B5CF6]/60 bg-[#8B5CF6]/20 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#F8F7FC] hover:bg-[#8B5CF6]/35 transition-colors whitespace-nowrap"
                >
                  <Send className="h-3.5 w-3.5 text-[#C4B5FD]" />
                  <span>OPEN EMAIL DRAFT</span>
                </button>

                <span className="text-[11px] text-[#9691A6]">
                  Opens your default email client directly
                </span>
              </div>

              {draftPreparedUrl && (
                <p className="text-xs text-[#C4B5FD]">
                  Email draft prepared for {email}.{' '}
                  <a href={draftPreparedUrl} className="underline hover:text-[#F8F7FC]">
                    Click here if your mail client did not open
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-[#9691A6]">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8F7FC] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8F7FC] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
