import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeIn, DURATION } from '@/lib/motion-config';
import { useResolvedVariants } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
}

/**
 * Intro de la home : UN seul fade global du contenu en 600ms.
 * Pas de stagger élément par élément (règle anti-Awwwards).
 */
export default function HomeIntro({ children }: Props) {
  const variants = useResolvedVariants(fadeIn);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: DURATION.slow }}
    >
      {children}
    </motion.div>
  );
}
