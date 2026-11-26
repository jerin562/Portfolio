import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function CursorGlow() {
  const prefersReduced = useReducedMotion();
  const [pos, setPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: -400,
    y: -400,
    visible: false,
  });

  useEffect(() => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY, visible: true });
    };
    const handleLeave = () => {
      setPos((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReduced]);

  if (prefersReduced || !pos.visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block transition-opacity duration-300"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(139, 92, 246, 0.11), transparent 72%)`,
      }}
    />
  );
}
