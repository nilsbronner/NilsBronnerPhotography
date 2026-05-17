import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
  /** Intensité du translate en pixels au bout du parallax. Brief : max 50px. */
  intensity?: number;
  className?: string;
}

/**
 * Wrapper pour parallax léger : l'enfant translate vers le haut
 * au fur et à mesure que le hero quitte le viewport. Intensité max
 * 50px (brief §5). Désactivé si reduced-motion.
 */
export default function HeroParallax({
  children,
  intensity = 50,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : intensity],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
