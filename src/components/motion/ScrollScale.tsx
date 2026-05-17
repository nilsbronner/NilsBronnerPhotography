import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Image qui passe de 0.96 à 1.0 en scale au scroll d'entrée,
 * puis reste à 1.0. Subtil (max scale autorisé : 1.05 par brief).
 * Donne l'impression que l'image "se déploie" en entrant.
 */
export default function ScrollScale({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 1 : 0.96, 1],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [reduced ? 1 : 0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, transformOrigin: 'center' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
