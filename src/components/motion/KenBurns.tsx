import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
  /** Durée d'un cycle complet (s). 30s donne une dérive cinéma imperceptible. */
  duration?: number;
  className?: string;
}

/**
 * Ken Burns subtil : scale 1.0 → 1.06 → 1.0 en boucle lente.
 * Effet cinéma : la caméra "respire" sur l'image fixe.
 * Désactivé en reduced-motion.
 */
export default function KenBurns({
  children,
  duration = 30,
  className,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.06, 1],
        x: ['0%', '-1%', '0%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.5, 1],
      }}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </motion.div>
  );
}
