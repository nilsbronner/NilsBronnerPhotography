import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
  /** Aria-label de la section (pour A11y). */
  label?: string;
}

/**
 * Tracking shot : la section pin verticalement, son contenu interne
 * scrolle horizontalement à mesure que l'utilisateur scrolle verticalement.
 * Effet "travelling latéral" du cinéma.
 *
 * Mécanique :
 *  - Section parente de hauteur = N × viewport (donne la "course" de scroll)
 *  - Sticky inner conteneur de hauteur viewport
 *  - useScroll mesure la progression de la section parente
 *  - useTransform map progression [0,1] -> translateX [0, -(contentWidth - vw)]
 *
 * Sur mobile : fallback en scroll horizontal natif (touch-friendly).
 */
export default function HorizontalTrack({ children, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(() => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const maxX = typeof window !== 'undefined' ? -(trackWidth - window.innerWidth) : 0;
  const x = useTransform(scrollYProgress, [0, 1], [0, maxX < 0 ? maxX : 0]);

  // Fallback mobile / reduced : scroll horizontal natif, pas de pin
  if (isMobile || reduced) {
    return (
      <section aria-label={label} className="overflow-x-auto">
        <div className="flex" ref={trackRef}>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label={label}
      style={{ height: `${Math.max(150, (trackWidth / window.innerWidth) * 100)}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div ref={trackRef} style={{ x }} className="flex will-change-transform">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
