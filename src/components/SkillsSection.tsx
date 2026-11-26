import { motion, useReducedMotion } from 'motion/react';
import {
  LANGUAGES,
  SOFT_SKILLS,
  TECHNICAL_SKILL_CATEGORIES,
} from '../data/portfolioData';

export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-16 bg-[#05040A] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F8F7FC] sm:text-4xl lg:text-5xl text-balance"
          >
            TECHNICAL &amp; SOFT <span className="purple-text-gradient">SKILLS</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAL_SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.number}
              initial={prefersReduced ? false : { opacity: 0, y: 22, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 sm:p-7 transition-colors duration-300 hover:border-[#8B5CF6]/45"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#8B5CF6]/15 blur-3xl transition-opacity duration-300 group-hover:bg-[#A855F7]/25"
              />
              <div className="relative z-10">
                <p className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] tabular-nums">
                  {category.number}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-[#F8F7FC]">
                  {category.title}
                </h3>
                <ul className="mt-5 space-y-2.5 text-sm text-[#9691A6]">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#F8F7FC]/85">
                      <span className="text-[#8B5CF6]" aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* 05 Soft Skills — Highlighted at the exact same card tier as Technical Skills */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 22, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-[#8B5CF6]/25 bg-[#0D0A16] p-6 sm:p-7 sm:col-span-2 lg:col-span-3 transition-colors duration-300 hover:border-[#8B5CF6]/55"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-[#8B5CF6]/20 blur-3xl transition-opacity duration-300 group-hover:bg-[#A855F7]/30"
            />
            <div className="relative z-10">
              <p className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] tabular-nums">
                05
              </p>
              <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-[#F8F7FC]">
                Soft Skills
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-3 text-sm text-[#9691A6]">
                {SOFT_SKILLS.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-[#F8F7FC]/85">
                    <span className="text-[#8B5CF6]" aria-hidden="true">
                      —
                    </span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 06 Languages */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 22, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 sm:p-7 sm:col-span-2 lg:col-span-1 transition-colors duration-300 hover:border-[#8B5CF6]/45"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#8B5CF6]/15 blur-3xl transition-opacity duration-300 group-hover:bg-[#A855F7]/25"
            />
            <div className="relative z-10">
              <p className="font-grotesk text-xs font-semibold tracking-[0.16em] text-[#A855F7] tabular-nums">
                06
              </p>
              <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-[#F8F7FC]">
                Languages
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm text-[#9691A6]">
                {LANGUAGES.map((language) => (
                  <li key={language} className="flex items-start gap-2 text-[#F8F7FC]/85">
                    <span className="text-[#8B5CF6]" aria-hidden="true">
                      —
                    </span>
                    <span>{language}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
