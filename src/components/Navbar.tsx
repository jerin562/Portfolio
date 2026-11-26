import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_LINKS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = NAV_LINKS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-28% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`no-print fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#05040A]/85 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      {/* Minimal scroll progress indicator */}
      <motion.div
        aria-hidden="true"
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C4B5FD]"
        style={{ scaleX: prefersReduced ? scrollYProgress : scaleX }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        {/* Left side: JM / JERIN MATHEW */}
        <a
          href="#hero"
          className="font-grotesk text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#F8F7FC] hover:text-[#C4B5FD] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-sm"
        >
          {PERSONAL_INFO.monogram} <span className="text-[#8B5CF6] mx-1">/</span>{' '}
          {PERSONAL_INFO.brandName}
        </a>

        {/* Right side: Exact 8 requested navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-[13px] font-medium text-[#9691A6]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-sm ${
                  isActive ? 'text-[#F8F7FC]' : 'text-[#9691A6] hover:text-[#F8F7FC]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#A855F7] transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0D0A16]/80 text-[#F8F7FC] hover:border-[#8B5CF6]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-white/[0.08] bg-[#05040A]/95 backdrop-blur-lg px-6 py-5"
        >
          <ul className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {NAV_LINKS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex min-h-[44px] items-center text-sm font-medium transition-colors ${
                      isActive ? 'text-[#C4B5FD]' : 'text-[#F8F7FC] hover:text-[#C4B5FD]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
