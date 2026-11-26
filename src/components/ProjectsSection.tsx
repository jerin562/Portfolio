import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/portfolioData';
import { GitHubRepoSummary } from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  aurelRepo: GitHubRepoSummary | null;
  githubLoading: boolean;
}

function ZovtyArtwork() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#05040A]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(139,92,246,0.22),transparent_68%)]" />
      <svg viewBox="0 0 280 140" className="relative z-10 h-full w-full">
        <defs>
          <linearGradient id="zovtyWaveA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="zovtyWaveB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <circle cx="140" cy="70" r="46" fill="none" stroke="#8B5CF6" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="140" cy="70" r="64" fill="none" stroke="#C4B5FD" strokeOpacity="0.1" strokeDasharray="4 6" strokeWidth="1" />

        <motion.path
          d="M 16 96 C 64 96, 86 44, 140 62 C 194 80, 216 34, 264 46"
          fill="none"
          stroke="url(#zovtyWaveA)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0.2, opacity: 0.5 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 16 108 C 72 86, 106 88, 152 54 C 192 26, 224 68, 264 62"
          fill="none"
          stroke="url(#zovtyWaveB)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0.2, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx="140"
          cy="62"
          r="4.5"
          fill="#C4B5FD"
          animate={prefersReduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

function HrmsArtwork() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#05040A]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.2),transparent_68%)]" />
      <svg viewBox="0 0 280 140" className="relative z-10 h-full w-full">
        <g stroke="#8B5CF6" strokeOpacity="0.32" strokeWidth="1.2">
          <line x1="140" y1="36" x2="78" y2="74" />
          <line x1="140" y1="36" x2="202" y2="74" />
          <line x1="78" y1="74" x2="140" y2="108" />
          <line x1="202" y1="74" x2="140" y2="108" />
          <line x1="78" y1="74" x2="202" y2="74" strokeDasharray="3 4" />
        </g>

        <motion.circle
          cx="140"
          cy="36"
          r="10"
          fill="#0D0A16"
          stroke="#A855F7"
          strokeWidth="2"
          animate={prefersReduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="78" cy="74" r="8" fill="#0D0A16" stroke="#8B5CF6" strokeWidth="1.8" />
        <circle cx="202" cy="74" r="8" fill="#0D0A16" stroke="#8B5CF6" strokeWidth="1.8" />
        <circle cx="140" cy="108" r="9" fill="#0D0A16" stroke="#C4B5FD" strokeWidth="1.8" />

        <circle cx="140" cy="36" r="3" fill="#C4B5FD" />
        <circle cx="78" cy="74" r="2.5" fill="#A855F7" />
        <circle cx="202" cy="74" r="2.5" fill="#A855F7" />
        <circle cx="140" cy="108" r="2.5" fill="#C4B5FD" />
      </svg>
    </div>
  );
}

function AurelArtwork({
  aurelRepo,
  githubLoading,
}: {
  aurelRepo: GitHubRepoSummary | null;
  githubLoading: boolean;
}) {
  return (
    <div className="relative flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.06] bg-[#05040A] p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.22),transparent_65%)]"
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#9691A6]">
        <span className="font-grotesk tracking-[0.18em] text-[#C4B5FD] uppercase">
          Repository
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FolderGit2 className="h-3.5 w-3.5 text-[#8B5CF6]" />
          <span>{githubLoading ? 'Syncing GitHub...' : aurelRepo ? 'GitHub Verified' : 'Public Repo'}</span>
        </span>
      </div>

      {/* Minimal abstract geometric storefront motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 240 68"
        className="relative z-10 my-auto h-16 w-full"
      >
        <rect
          x="24"
          y="10"
          width="52"
          height="48"
          rx="10"
          fill="none"
          stroke="#8B5CF6"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <rect
          x="94"
          y="6"
          width="52"
          height="56"
          rx="26"
          fill="rgba(139,92,246,0.12)"
          stroke="#C4B5FD"
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
        <rect
          x="164"
          y="10"
          width="52"
          height="48"
          rx="10"
          fill="none"
          stroke="#A855F7"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
      </svg>

      <p className="relative z-10 truncate text-[11px] text-[#9691A6]">
        {aurelRepo
          ? `${aurelRepo.fullName} · branch ${aurelRepo.defaultBranch}`
          : 'github.com/jerin562/aurel-commerce'}
      </p>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  aurelRepo,
  githubLoading,
}: {
  project: ProjectItem;
  index: number;
  aurelRepo: GitHubRepoSummary | null;
  githubLoading: boolean;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 28, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8B5CF6]/50"
    >
      <div
        aria-hidden="true"
        className="card-bottom-glow pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-grotesk font-semibold tracking-[0.14em] text-[#A855F7] tabular-nums">
            PROJECT {project.number}
          </span>
          <span className="text-[#9691A6]">{project.category}</span>
        </div>

        <div>
          <h3 className="font-display text-2xl sm:text-[1.65rem] font-bold tracking-tight text-[#F8F7FC]">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#9691A6]">
            {project.description}
          </p>
        </div>

        {project.id === 'zovty' && <ZovtyArtwork />}
        {project.id === 'hrms' && <HrmsArtwork />}
        {project.id === 'aurel-commerce' && (
          <AurelArtwork aurelRepo={aurelRepo} githubLoading={githubLoading} />
        )}
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        {project.status ? (
          <span className="inline-flex items-center gap-2 rounded-md border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 font-grotesk text-[11px] font-medium tracking-[0.14em] text-[#C4B5FD]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" aria-hidden="true" />
            <span>{project.status}</span>
          </span>
        ) : (
          <span className="font-grotesk text-[11px] tracking-[0.12em] text-[#9691A6] uppercase">
            {aurelRepo?.description ?? 'Public Repository'}
          </span>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#8B5CF6]/45 bg-[#8B5CF6]/15 px-3.5 py-1.5 text-xs font-medium text-[#F8F7FC] hover:bg-[#8B5CF6]/30 hover:border-[#A855F7] transition-colors whitespace-nowrap"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C4B5FD]" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ aurelRepo, githubLoading }: ProjectsSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-16 bg-[#05040A] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
            Selected Work
          </p>
          <h2
            id="projects-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F8F7FC] sm:text-4xl lg:text-5xl"
          >
            MY WORK &amp; <span className="purple-text-gradient">PROJECTS</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              aurelRepo={aurelRepo}
              githubLoading={githubLoading}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
