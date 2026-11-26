import { type RefObject, useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { HERO_ROTATING_TITLES, PERSONAL_INFO } from '../data/portfolioData';
import { computePointerParallax } from '../utils/portfolioLogic';

interface HeroSectionProps {
  introComplete: boolean;
  portraitSlotRef?: RefObject<HTMLDivElement | null>;
  useSharedDesktopPortrait?: boolean;
}

const PORTRAIT_PARTICLES = [
  { id: 1, left: '18%', top: '22%', size: 3, duration: 6.4, delay: 0.2 },
  { id: 2, left: '82%', top: '18%', size: 4, duration: 7.2, delay: 1.1 },
  { id: 3, left: '12%', top: '54%', size: 2.5, duration: 5.8, delay: 0.7 },
  { id: 4, left: '88%', top: '48%', size: 3.5, duration: 6.9, delay: 1.6 },
  { id: 5, left: '26%', top: '76%', size: 3, duration: 7.5, delay: 0.4 },
  { id: 6, left: '74%', top: '72%', size: 2.5, duration: 6.1, delay: 1.9 },
  { id: 7, left: '34%', top: '14%', size: 2, duration: 5.6, delay: 0.9 },
  { id: 8, left: '66%', top: '12%', size: 3, duration: 7.0, delay: 0.5 },
  { id: 9, left: '8%', top: '36%', size: 2, duration: 6.7, delay: 1.3 },
  { id: 10, left: '92%', top: '34%', size: 2.5, duration: 5.9, delay: 0.8 },
];

export function HeroSection({
  introComplete,
  portraitSlotRef,
  useSharedDesktopPortrait = false,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(PERSONAL_INFO.portraitPath);
  const prefersReduced = useReducedMotion();

  // Pointer parallax motion values (smooth spring, never distorts face)
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 75, damping: 20, mass: 0.6 });
  const pointerY = useSpring(rawPointerY, { stiffness: 75, damping: 20, mass: 0.6 });
  const glowX = useTransform(pointerX, (v) => v * -1.35);
  const glowY = useTransform(pointerY, (v) => v * -1.35);

  // Scroll-driven hero exit transitions (Animation 04)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const portraitScrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const glowScrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const textScrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_ROTATING_TITLES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const onPointerMove = (e: PointerEvent) => {
      const offset = computePointerParallax(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight,
        11
      );
      rawPointerX.set(offset.x);
      rawPointerY.set(offset.y);
    };
    const onPointerLeave = () => {
      rawPointerX.set(0);
      rawPointerY.set(0);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [prefersReduced, rawPointerX, rawPointerY]);

  const [firstPart, secondPart] = HERO_ROTATING_TITLES[titleIndex % HERO_ROTATING_TITLES.length];
  const shouldReveal = introComplete || prefersReduced;

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero introduction"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#05040A] pt-20 pb-8"
    >
      {/* Breathing purple radial ambient glow behind hero (Animation 03) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: prefersReduced ? 0.7 : glowScrollOpacity }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : {
                  scale: [1, 1.1, 1],
                  opacity: [0.55, 0.82, 0.55],
                }
          }
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="purple-radial-aura absolute left-1/2 top-[48%] h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:h-[700px] lg:w-[700px]"
        />
        <motion.div
          style={{ x: prefersReduced ? 0 : glowX, y: prefersReduced ? 0 : glowY }}
          animate={
            prefersReduced
              ? undefined
              : {
                  scale: [0.95, 1.08, 0.95],
                  opacity: [0.22, 0.4, 0.22],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[34%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#A855F7]/25 blur-[110px]"
        />
      </motion.div>

      {/* Main composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-0">
          {/* LEFT SIDE: Text-mask entrance & scroll transition */}
          <motion.div
            style={{
              y: prefersReduced ? 0 : textScrollY,
              opacity: prefersReduced ? 1 : textScrollOpacity,
            }}
            className="order-1 flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left lg:pr-4 z-20"
          >
            <div className="overflow-hidden">
              <motion.p
                initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
                animate={shouldReveal ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-grotesk text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-[#A855F7]"
              >
                HELLO, I&apos;M
              </motion.p>
            </div>

            <h1 className="mt-3 font-display text-5xl font-bold leading-[0.98] tracking-tight text-[#F8F7FC] sm:text-6xl lg:text-[4.85rem]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={shouldReveal ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                  transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  JERIN
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={shouldReveal ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                  transition={{ duration: 0.72, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  MATHEW<span className="text-[#A855F7]">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={
                shouldReveal
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 12, filter: 'blur(4px)' }
              }
              transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-grotesk text-xs sm:text-sm font-medium tracking-[0.16em] text-[#C4B5FD]"
            >
              {PERSONAL_INFO.tagline}.
            </motion.p>
          </motion.div>

          {/* CENTER PORTRAIT SLOT — Hosts local portrait on mobile/reduced-motion and guides shared desktop glide */}
          <motion.div
            style={{
              y: prefersReduced || useSharedDesktopPortrait ? 0 : portraitScrollY,
              scale: prefersReduced || useSharedDesktopPortrait ? 1 : portraitScrollScale,
            }}
            className="order-2 relative flex justify-center lg:col-span-4 lg:-mx-10 z-10"
          >
            <div
              ref={portraitSlotRef}
              data-testid="hero-portrait-slot"
              className="relative flex w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[445px] h-[390px] sm:h-[465px] lg:h-[600px] items-end justify-center"
            >
              {/* Entrance + Floating + Pointer Parallax wrapper (hidden on lg+ when shared gliding portrait is active) */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 52, scale: 0.96 }}
                animate={
                  shouldReveal
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 52, scale: 0.96 }
                }
                transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: prefersReduced ? 0 : pointerX,
                  y: prefersReduced ? 0 : pointerY,
                }}
                className={`relative flex h-full w-full items-end justify-center ${
                  useSharedDesktopPortrait ? 'lg:hidden' : ''
                }`}
              >
              {/* Animated breathing purple rim-light directly behind silhouette */}
              <motion.div
                aria-hidden="true"
                style={{ x: prefersReduced ? 0 : glowX, y: prefersReduced ? 0 : glowY }}
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        scale: [0.96, 1.06, 0.96],
                        opacity: [0.45, 0.72, 0.45],
                      }
                }
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute top-[12%] left-1/2 h-[76%] w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#A855F7]/35 via-[#8B5CF6]/20 to-transparent blur-3xl"
              />

              {/* Subtle violet dust particles floating around portrait */}
              {!prefersReduced &&
                PORTRAIT_PARTICLES.map((p) => (
                  <motion.span
                    key={p.id}
                    aria-hidden="true"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: p.size,
                      height: p.size,
                    }}
                    animate={{
                      y: [-8, 10, -8],
                      opacity: [0.15, 0.55, 0.15],
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute z-20 rounded-full bg-[#C4B5FD] blur-[0.5px]"
                  />
                ))}

              {/* Subtle continuous floating vertical motion on exact transparent portrait */}
              <motion.img
                src={imgSrc}
                onError={() => setImgSrc(PERSONAL_INFO.originalPhotoPath)}
                alt="Portrait of Jerin Thomas Mathew"
                referrerPolicy="no-referrer"
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  borderStyle: 'none',
                  borderWidth: '4px',
                  maskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
                }}
                className="relative z-10 h-[390px] sm:h-[465px] lg:h-[600px] w-auto object-contain object-bottom select-none"
              />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Animated rotating professional titles */}
          <motion.div
            style={{
              y: prefersReduced ? 0 : textScrollY,
              opacity: prefersReduced ? 1 : textScrollOpacity,
            }}
            initial={prefersReduced ? false : { opacity: 0, x: 24 }}
            animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-3 flex flex-col items-center text-center lg:col-span-3 lg:items-end lg:text-right lg:pl-4 z-20"
          >
            <p className="font-grotesk text-xs sm:text-sm font-medium tracking-wide text-[#A855F7]">
              Business &amp; Technology
            </p>

            <div className="mt-2 min-h-[78px] sm:min-h-[92px] lg:min-h-[112px] flex items-start justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${firstPart}-${secondPart}`}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-bold leading-[1.15] tracking-tight"
                >
                  <span className="block text-[#F8F7FC]">{firstPart}</span>
                  <span className="block purple-text-gradient">{secondPart}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lower bar: LinkedIn + GitHub icons on left lower area + centered scroll indicator */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-4 lg:px-10">
        <div className="flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jerin Mathew on LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0D0A16]/80 text-[#9691A6] hover:border-[#8B5CF6]/60 hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jerin Mathew on GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0D0A16]/80 text-[#9691A6] hover:border-[#8B5CF6]/60 hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <a
          href="#about"
          aria-label="Scroll down to About Me"
          className="group absolute left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1.5 text-xs font-grotesk tracking-[0.2em] text-[#9691A6] hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-sm px-2 py-1"
        >
          <span className="uppercase">Scroll</span>
          <motion.span
            animate={prefersReduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex text-[#A855F7]"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </a>

        <div className="w-20" aria-hidden="true" />
      </div>
    </section>
  );
}
