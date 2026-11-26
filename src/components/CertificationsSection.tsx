import { Award } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CERTIFICATIONS } from '../data/portfolioData';

export function CertificationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative scroll-mt-16 bg-[#05040A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-grotesk font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
            <Award className="h-4 w-4" />
            <span>Credentials</span>
          </div>
          <h2
            id="certifications-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F8F7FC] sm:text-4xl lg:text-5xl"
          >
            CERTIFICATIONS
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0A16] p-6 transition-colors duration-300 hover:border-[#8B5CF6]/50"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-[#8B5CF6]/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p className="font-grotesk text-xs font-semibold text-[#A855F7] tabular-nums">
                0{idx + 1}
              </p>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-[#F8F7FC]">
                {cert.title}
              </h3>
              <p className="mt-2 text-xs text-[#9691A6]">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
