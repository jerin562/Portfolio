import { type RefObject, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ABOUT_COPY, PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onDownloadResume: (preferred?: 'docx' | 'pdf') => void;
  docxAvailable: boolean;
  pdfAvailable: boolean;
  downloadingResume: boolean;
  portraitSlotRef?: RefObject<HTMLDivElement | null>;
  useSharedDesktopPortrait?: boolean;
}

const HEADING_LINE_1 = ['CREATIVITY'];
const HEADING_LINE_2 = ['IS', 'MY', 'PASSION.'];

export function AboutSection({
  onDownloadResume,
  docxAvailable,
  pdfAvailable,
  downloadingResume,
  portraitSlotRef,
  useSharedDesktopPortrait = false,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgSrc, setImgSrc] = useState(PERSONAL_INFO.portraitPath);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const glowParallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-16 overflow-hidden bg-[#05040A] py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* LEFT: Portrait landing slot for gliding desktop photo + mobile/reduced fallback */}
        <motion.div
          style={{ y: prefersReduced || useSharedDesktopPortrait ? 0 : portraitParallaxY }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div
            ref={portraitSlotRef}
            data-testid="about-portrait-slot"
            className="relative flex w-full max-w-[380px] lg:max-w-[440px] h-[420px] sm:h-[490px] items-end justify-center"
          >
            <motion.div
              aria-hidden="true"
              style={{ y: prefersReduced ? 0 : glowParallaxY }}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      scale: [0.95, 1.06, 0.95],
                      opacity: [0.55, 0.85, 0.55],
                    }
              }
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-6 rounded-full bg-gradient-to-tr from-[#8B5CF6]/35 via-[#A855F7]/20 to-transparent blur-3xl"
            />

            <motion.div
              initial={
                prefersReduced
                  ? false
                  : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 24 }
              }
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 flex h-full justify-center items-end ${
                useSharedDesktopPortrait ? 'lg:hidden' : ''
              }`}
            >
              <img
                src={imgSrc}
                onError={() => setImgSrc(PERSONAL_INFO.originalPhotoPath)}
                alt="Jerin Thomas Mathew portrait"
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                }}
                className="h-full w-auto object-contain object-bottom select-none"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Word-by-word heading reveal & staggered prose */}
        <div className="relative z-20 lg:col-span-7">
          <h2
            id="about-heading"
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="flex flex-wrap gap-x-3">
              {HEADING_LINE_1.map((word, idx) => (
                <span key={word} className="inline-block overflow-hidden">
                  <motion.span
                    initial={prefersReduced ? false : { y: '100%', opacity: 0, filter: 'blur(4px)' }}
                    whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block purple-text-gradient"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>

            <span className="mt-1 flex flex-wrap gap-x-3.5 text-[#F8F7FC]">
              {HEADING_LINE_2.map((word, idx) => (
                <span key={word} className="inline-block overflow-hidden">
                  <motion.span
                    initial={prefersReduced ? false : { y: '100%', opacity: 0, filter: 'blur(4px)' }}
                    whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.65,
                      delay: 0.14 + idx * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h2>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-5 max-w-2xl text-base leading-[1.75] text-[#9691A6] sm:text-[1.0625rem]"
          >
            {ABOUT_COPY.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <button
              type="button"
              onClick={() => onDownloadResume()}
              disabled={downloadingResume}
              className="inline-flex items-center gap-3 rounded-lg border border-[#8B5CF6]/60 bg-[#8B5CF6]/15 px-7 py-3.5 font-grotesk text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#F8F7FC] shadow-[0_0_28px_rgba(139,92,246,0.28)] hover:bg-[#8B5CF6]/30 hover:border-[#A855F7] transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] disabled:opacity-60"
            >
              <Download className="h-4 w-4 text-[#C4B5FD]" />
              <span>{downloadingResume ? 'PREPARING...' : 'DOWNLOAD RESUME'}</span>
            </button>

            {docxAvailable && pdfAvailable && (
              <button
                type="button"
                onClick={() => onDownloadResume('pdf')}
                disabled={downloadingResume}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-5 py-3.5 font-grotesk text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#C4B5FD] hover:border-[#8B5CF6]/60 hover:text-[#F8F7FC] transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] disabled:opacity-60"
              >
                <span>PDF VERSION</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
