import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { pageTransition } from '@/lib/motion-config';
import { useResolvedVariants } from '@/lib/use-reduced-motion';

interface Props {
  children: ReactNode;
}

/**
 * Wrapper de page : fade in 700ms à l'arrivée, fade out 500ms au départ.
 * Hydraté via client:idle — la page peut s'afficher en SSG avant React.
 */
export default function PageTransition({ children }: Props) {
  const variants = useResolvedVariants(pageTransition);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
