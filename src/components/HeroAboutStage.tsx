import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  computeGlideEndpoints,
  computePointerParallax,
  type GlideEndpoints,
  type SlotBounds,
} from '../utils/portfolioLogic';
import { AboutSection } from './AboutSection';
import { HeroSection } from './HeroSection';

interface HeroAboutStageProps {
  introComplete: boolean;
  onDownloadResume: (preferred?: 'docx' | 'pdf') => void;
  docxAvailable: boolean;
  pdfAvailable: boolean;
  downloadingResume: boolean;
}

const GLIDE_PARTICLES = [
  { id: 1, left: '18%', top: '22%', size: 3, duration: 6.4, delay: 0.2 },
  { id: 2, left: '82%', top: '18%', size: 4, duration: 7.2, delay: 1.1 },
  { id: 3, left: '12%', top: '54%', size: 2.5, duration: 5.8, delay: 0.7 },
  { id: 4, left: '88%', top: '48%', size: 3.5, duration: 6.9, delay: 1.6 },
  { id: 5, left: '26%', top: '76%', size: 3, duration: 7.5, delay: 0.4 },
  { id: 6, left: '74%', top: '72%', size: 2.5, duration: 6.1, delay: 1.9 },
  { id: 7, left: '34%', top: '14%', size: 2, duration: 5.6, delay: 0.9 },
  { id: 8, left: '66%', top: '12%', size: 3, duration: 7.0, delay: 0.5 },
];

const DEFAULT_SLOT: SlotBounds = { left: 480, top: 150, width: 445, height: 600 };
const DEFAULT_ENDPOINTS: GlideEndpoints = {
  startX: 0,
  startY: 0,
  endX: -360,
  endY: 880,
  endScale: 0.8167,
};

export function HeroAboutStage({
  introComplete,
  onDownloadResume,
  docxAvailable,
  pdfAvailable,
  downloadingResume,
}: HeroAboutStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [imgSrc, setImgSrc] = useState(PERSONAL_INFO.portraitPath);

  const [heroAnchor, setHeroAnchor] = useState<SlotBounds>(DEFAULT_SLOT);
  const [endpoints, setEndpoints] = useState<GlideEndpoints>(DEFAULT_ENDPOINTS);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const measureSlots = useCallback(() => {
    const stageEl = stageRef.current;
    const heroEl = heroSlotRef.current;
    const aboutEl = aboutSlotRef.current;
    if (!stageEl || !heroEl || !aboutEl) return;

    const stageRect = stageEl.getBoundingClientRect();
    const heroRect = heroEl.getBoundingClientRect();
    const aboutRect = aboutEl.getBoundingClientRect();

    if (heroRect.height <= 0 || aboutRect.height <= 0) return;

    const heroBounds: SlotBounds = {
      left: Number((heroRect.left - stageRect.left).toFixed(2)),
      top: Number((heroRect.top - stageRect.top).toFixed(2)),
      width: Number(heroRect.width.toFixed(2)),
      height: Number(heroRect.height.toFixed(2)),
    };

    const aboutBounds: SlotBounds = {
      left: Number((aboutRect.left - stageRect.left).toFixed(2)),
      top: Number((aboutRect.top - stageRect.top).toFixed(2)),
      width: Number(aboutRect.width.toFixed(2)),
      height: Number(aboutRect.height.toFixed(2)),
    };

    setHeroAnchor(heroBounds);
    setEndpoints(computeGlideEndpoints(heroBounds, aboutBounds));
    setMeasured(true);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop || prefersReduced) return;
    measureSlots();

    const observer = new ResizeObserver(() => {
      measureSlots();
    });
    if (stageRef.current) observer.observe(stageRef.current);
    if (heroSlotRef.current) observer.observe(heroSlotRef.current);
    if (aboutSlotRef.current) observer.observe(aboutSlotRef.current);

    window.addEventListener('resize', measureSlots);
    document.fonts?.ready.then(measureSlots).catch(() => {});

    const timer = window.setTimeout(measureSlots, 180);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureSlots);
      window.clearTimeout(timer);
    };
  }, [isDesktop, prefersReduced, measureSlots]);

  // Pointer parallax (active in Hero, gently attenuated as portrait settles into About)
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 75, damping: 20, mass: 0.6 });
  const pointerY = useSpring(rawPointerY, { stiffness: 75, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (prefersReduced || !isDesktop) return;
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
  }, [prefersReduced, isDesktop, rawPointerX, rawPointerY]);

  // Scroll-driven glide between Hero center slot and About Me left slot
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 25,
    restDelta: 0.001,
  });

  const glideX = useTransform(smoothProgress, [0, 0.88], [endpoints.startX, endpoints.endX]);
  const glideY = useTransform(smoothProgress, [0, 0.88], [endpoints.startY, endpoints.endY]);
  const glideScale = useTransform(smoothProgress, [0, 0.88], [1, endpoints.endScale]);
  const glideRotate = useTransform(smoothProgress, [0, 0.44, 0.88], [0, -1.6, 0]);
  const parallaxWeight = useTransform(smoothProgress, [0, 0.75], [1, 0.25]);

  const weightedPointerX = useTransform(
    [pointerX, parallaxWeight],
    ([px, w]) => Number(px) * Number(w)
  );
  const weightedPointerY = useTransform(
    [pointerY, parallaxWeight],
    ([py, w]) => Number(py) * Number(w)
  );
  const glowOffsetX = useTransform(weightedPointerX, (v) => v * -1.35);
  const glowOffsetY = useTransform(weightedPointerY, (v) => v * -1.35);

  const showSharedDesktopPortrait = isDesktop && !prefersReduced;
  const shouldReveal = introComplete || Boolean(prefersReduced);

  return (
    <div ref={stageRef} className="relative overflow-x-clip">
      <HeroSection
        introComplete={introComplete}
        portraitSlotRef={heroSlotRef}
        useSharedDesktopPortrait={!prefersReduced}
      />

      <AboutSection
        onDownloadResume={onDownloadResume}
        docxAvailable={docxAvailable}
        pdfAvailable={pdfAvailable}
        downloadingResume={downloadingResume}
        portraitSlotRef={aboutSlotRef}
        useSharedDesktopPortrait={!prefersReduced}
      />

      {showSharedDesktopPortrait && (
        <motion.div
          data-testid="gliding-portrait"
          aria-hidden="true"
          style={{
            left: heroAnchor.left,
            top: heroAnchor.top,
            width: heroAnchor.width,
            height: heroAnchor.height,
            x: glideX,
            y: glideY,
            scale: glideScale,
            rotate: glideRotate,
            transformOrigin: 'top center',
            opacity: measured ? 1 : 0,
          }}
          className="pointer-events-none absolute z-[15] hidden lg:flex items-end justify-center will-change-transform"
        >
          {/* Cinematic bottom-up entrance + pointer parallax wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 52, scale: 0.96 }}
            animate={
              shouldReveal ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 52, scale: 0.96 }
            }
            transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: weightedPointerX,
              y: weightedPointerY,
            }}
            className="relative flex h-full w-full items-end justify-center"
          >
            {/* Breathing purple rim-light gliding behind the portrait */}
            <motion.div
              style={{ x: glowOffsetX, y: glowOffsetY }}
              animate={{
                scale: [0.96, 1.06, 0.96],
                opacity: [0.46, 0.74, 0.46],
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute top-[12%] left-1/2 h-[76%] w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#A855F7]/35 via-[#8B5CF6]/20 to-transparent blur-3xl"
            />

            {/* Floating subtle violet dust particles accompanying the portrait */}
            {GLIDE_PARTICLES.map((p) => (
              <motion.span
                key={p.id}
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

            {/* Exact transparent portrait cutout with subtle idle hover */}
            <motion.img
              src={imgSrc}
              onLoad={measureSlots}
              onError={() => setImgSrc(PERSONAL_INFO.originalPhotoPath)}
              alt="Portrait of Jerin Thomas Mathew"
              referrerPolicy="no-referrer"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                borderStyle: 'none',
                borderWidth: '4px',
                maskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
              }}
              className="relative z-10 h-full w-auto object-contain object-bottom select-none"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
