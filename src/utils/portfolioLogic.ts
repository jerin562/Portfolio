export interface ParallaxOffset {
  x: number;
  y: number;
}

export function computePointerParallax(
  clientX: number,
  clientY: number,
  viewportWidth: number,
  viewportHeight: number,
  maxOffsetPx = 14
): ParallaxOffset {
  if (viewportWidth <= 0 || viewportHeight <= 0) {
    return { x: 0, y: 0 };
  }
  const normX = Math.max(-1, Math.min(1, (clientX / viewportWidth) * 2 - 1));
  const normY = Math.max(-1, Math.min(1, (clientY / viewportHeight) * 2 - 1));
  return {
    x: Number((normX * maxOffsetPx).toFixed(2)),
    y: Number((normY * maxOffsetPx).toFixed(2)),
  };
}

export interface SlotBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GlideEndpoints {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  endScale: number;
}

export function computeGlideEndpoints(
  heroSlot: SlotBounds,
  aboutSlot: SlotBounds
): GlideEndpoints {
  const safeHeroHeight = heroSlot.height > 0 ? heroSlot.height : 1;
  const startCenterX = heroSlot.left + heroSlot.width / 2;
  const endCenterX = aboutSlot.left + aboutSlot.width / 2;

  const endScale = Number((aboutSlot.height / safeHeroHeight).toFixed(4));
  const deltaX = Number((endCenterX - startCenterX).toFixed(2));
  const deltaY = Number((aboutSlot.top - heroSlot.top).toFixed(2));

  return {
    startX: 0,
    startY: 0,
    endX: deltaX,
    endY: deltaY,
    endScale: Math.max(0.5, Math.min(1.25, endScale)),
  };
}

export type ResumeDownloadFormat = 'docx' | 'pdf' | 'modal';

export function selectResumeDownloadFormat(
  docxAvailable: boolean,
  pdfAvailable: boolean,
  preferred?: 'docx' | 'pdf'
): ResumeDownloadFormat {
  if (preferred === 'pdf' && pdfAvailable) return 'pdf';
  if (preferred === 'docx' && docxAvailable) return 'docx';
  if (docxAvailable) return 'docx';
  if (pdfAvailable) return 'pdf';
  return 'modal';
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (trimmedMessage.length < 10) {
    errors.message = 'Please include a brief message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoUrl(recipientEmail: string, input: ContactFormInput): string {
  const target = isValidEmail(recipientEmail) ? recipientEmail.trim() : 'jerinthomas562@gmail.com';
  const subject = encodeURIComponent(`Portfolio Inquiry from ${input.name.trim()}`);
  const body = encodeURIComponent(
    `Name: ${input.name.trim()}\nReply-To: ${input.email.trim()}\n\n${input.message.trim()}`
  );
  return `mailto:${target}?subject=${subject}&body=${body}`;
}

export interface GitHubUserSummary {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number | null;
  followers: number | null;
  bio: string | null;
}

export interface GitHubRepoSummary {
  fullName: string;
  htmlUrl: string;
  description: string | null;
  defaultBranch: string;
  language: string | null;
  sizeKb: number | null;
  hasCommittedFiles: boolean;
}

export function normalizeGitHubUser(raw: unknown): GitHubUserSummary | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.login !== 'string' || typeof r.html_url !== 'string') return null;
  return {
    login: r.login,
    name: typeof r.name === 'string' && r.name.trim() ? r.name : r.login,
    avatarUrl: typeof r.avatar_url === 'string' ? r.avatar_url : '',
    htmlUrl: r.html_url,
    publicRepos: typeof r.public_repos === 'number' ? r.public_repos : null,
    followers: typeof r.followers === 'number' ? r.followers : null,
    bio: typeof r.bio === 'string' && r.bio.trim() ? r.bio : null,
  };
}

export function normalizeGitHubRepo(raw: unknown, contentsRaw?: unknown): GitHubRepoSummary | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.full_name !== 'string' || typeof r.html_url !== 'string') return null;
  const sizeKb = typeof r.size === 'number' ? r.size : null;
  const hasCommittedFiles = Array.isArray(contentsRaw)
    ? contentsRaw.length > 0
    : typeof sizeKb === 'number' && sizeKb > 0;
  return {
    fullName: r.full_name,
    htmlUrl: r.html_url,
    description: typeof r.description === 'string' && r.description.trim() ? r.description : null,
    defaultBranch: typeof r.default_branch === 'string' ? r.default_branch : 'main',
    language: typeof r.language === 'string' ? r.language : null,
    sizeKb,
    hasCommittedFiles,
  };
}
