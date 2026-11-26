import { useEffect, useRef, useState } from 'react';
import { Briefcase, Check, GraduationCap, Pencil } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { EDUCATION_DATA, EXPERIENCE_DATA } from '../data/portfolioData';

interface JourneySectionProps {
  mcaInstitution: string;
  onUpdateMcaInstitution: (value: string) => void;
}

export function JourneySection({
  mcaInstitution,
  onUpdateMcaInstitution,
}: JourneySectionProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'experience' | 'education'>('all');
  const [editingInstitution, setEditingInstitution] = useState(false);
  const [draftInstitution, setDraftInstitution] = useState(mcaInstitution);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 82%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === '#experience' && filter === 'education') {
        setFilter('all');
      } else if (window.location.hash === '#education' && filter === 'experience') {
        setFilter('all');
      }
    };
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, [filter]);

  const saveInstitution = () => {
    const trimmed = draftInstitution.trim();
    if (trimmed) {
      onUpdateMcaInstitution(trimmed);
    } else {
      setDraftInstitution(mcaInstitution);
    }
    setEditingInstitution(false);
  };

  const showExperience = filter === 'all' || filter === 'experience';
  const showEducation = filter === 'all' || filter === 'education';

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative scroll-mt-16 bg-[#05040A] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
              Background
            </p>
            <h2
              id="journey-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F8F7FC] sm:text-4xl lg:text-5xl"
            >
              EXPERIENCE &amp; <span className="purple-text-gradient">EDUCATION</span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Timeline filter"
            className="inline-flex items-center rounded-xl border border-white/10 bg-[#0D0A16] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`rounded-lg px-4 py-2 font-grotesk text-xs font-semibold tracking-[0.14em] transition-all whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-[#8B5CF6] text-[#F8F7FC] shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                  : 'text-[#9691A6] hover:text-[#F8F7FC]'
              }`}
            >
              ALL
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'experience'}
              onClick={() => setFilter('experience')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-grotesk text-xs font-semibold tracking-[0.14em] transition-all whitespace-nowrap shrink-0 ${
                filter === 'experience'
                  ? 'bg-[#8B5CF6] text-[#F8F7FC] shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                  : 'text-[#9691A6] hover:text-[#F8F7FC]'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>EXPERIENCE</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'education'}
              onClick={() => setFilter('education')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-grotesk text-xs font-semibold tracking-[0.14em] transition-all whitespace-nowrap shrink-0 ${
                filter === 'education'
                  ? 'bg-[#8B5CF6] text-[#F8F7FC] shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                  : 'text-[#9691A6] hover:text-[#F8F7FC]'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>EDUCATION</span>
            </button>
          </div>
        </motion.div>

        {/* Scroll-animated vertical purple timeline */}
        <div ref={timelineRef} className="relative mt-14 pl-8 sm:pl-10 space-y-10">
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/[0.06]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReduced ? 1 : lineScaleY }}
            className="absolute left-[11px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#A855F7] via-[#8B5CF6] to-[#C4B5FD]/30"
          />

          {showExperience && (
            <div id="experience" className="scroll-mt-24 space-y-8">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <motion.div
                  key={exp.role}
                  initial={prefersReduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] sm:-left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#A855F7] bg-[#05040A] shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                  />

                  <div className="rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
                          Experience
                        </p>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#F8F7FC]">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="font-grotesk text-xs font-medium tracking-wide text-[#C4B5FD]">
                        {exp.period}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm font-medium text-[#A855F7]">
                      {exp.organization}
                    </p>

                    <div className="mt-6">
                      <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.14em] text-[#9691A6]">
                        Responsibilities
                      </p>
                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#F8F7FC]/85">
                        {exp.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#8B5CF6]" aria-hidden="true">
                              —
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {showEducation && (
            <div id="education" className="scroll-mt-24 space-y-8">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={prefersReduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] sm:-left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#A855F7] bg-[#05040A] shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                  />

                  <div className="rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
                          Education
                        </p>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#F8F7FC]">
                          {edu.degree}
                        </h3>
                      </div>
                      <span className="font-grotesk text-xs font-medium tracking-wide text-[#C4B5FD]">
                        {edu.period}
                      </span>
                    </div>

                    {edu.editableInstitution ? (
                      <div className="mt-2">
                        {editingInstitution ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <label htmlFor="mca-institution-input" className="sr-only">
                              MCA Institution Name
                            </label>
                            <input
                              id="mca-institution-input"
                              type="text"
                              value={draftInstitution}
                              onChange={(e) => setDraftInstitution(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveInstitution();
                                if (e.key === 'Escape') {
                                  setDraftInstitution(mcaInstitution);
                                  setEditingInstitution(false);
                                }
                              }}
                              placeholder="Enter MCA institution name"
                              className="min-w-[240px] rounded-lg border border-[#8B5CF6]/60 bg-[#05040A] px-3 py-1.5 text-sm text-[#F8F7FC] focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                            />
                            <button
                              type="button"
                              onClick={saveInstitution}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#8B5CF6] px-3 py-1.5 text-xs font-medium text-[#F8F7FC] hover:bg-[#A855F7] transition-colors"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Save</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-medium text-[#A855F7]">{mcaInstitution}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setDraftInstitution(mcaInstitution);
                                setEditingInstitution(true);
                              }}
                              aria-label="Edit MCA institution name"
                              className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-[#9691A6] hover:text-[#F8F7FC] hover:bg-white/[0.05] transition-colors"
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm font-medium text-[#A855F7]">
                        {edu.defaultInstitution}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-[#9691A6]">{edu.focus}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
