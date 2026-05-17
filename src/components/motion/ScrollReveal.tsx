import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, REVEAL_VIEWPORT } from '@/lib/motion-config';
import { useResolvedVariants } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
  /** Délai en secondes — usage parcimonieux, jamais > 0.1s (anti-cascade). */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

/**
 * Wrapper réutilisable pour les apparitions au scroll.
 * Pattern unique partout : fadeUp + viewport once, margin -10%.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: Props) {
  const variants = useResolvedVariants(fadeUp);
  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
