import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    return true;
  });

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      onComplete();
      return;
    }
    if (!visible) {
      onComplete();
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2350);
    return () => window.clearTimeout(timer);
  }, [prefersReduced, visible, onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Portfolio introduction sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#05040A] px-6"
        >
          {/* Subtle expanding purple ambient light */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.45, opacity: 0 }}
            animate={{ scale: [0.45, 1.15, 1], opacity: [0, 0.7, 0.45] }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="purple-radial-aura pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-3xl"
          />

          {/* JM Monogram + masked name intro */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-bold tracking-[0.22em] sm:text-6xl"
            >
              <span className="purple-text-gradient">{PERSONAL_INFO.monogram}</span>
            </motion.div>

            <div className="mt-4 overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-grotesk text-xs font-medium uppercase tracking-[0.34em] text-[#C4B5FD]"
              >
                {PERSONAL_INFO.fullName}
              </motion.p>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-[1.5px] w-36 origin-left bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C4B5FD]"
            />
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-10 rounded-lg border border-white/15 bg-[#0D0A16]/85 px-5 py-2.5 font-grotesk text-xs font-medium uppercase tracking-[0.18em] text-[#C4B5FD] hover:border-[#8B5CF6] hover:text-[#F8F7FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
