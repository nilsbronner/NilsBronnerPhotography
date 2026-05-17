/**
 * Hook wrapper : retourne des variants neutralisés si l'utilisateur
 * a `prefers-reduced-motion: reduce`. Toutes les animations doivent
 * passer par ce hook.
 */

import { useReducedMotion as useReducedMotionMotion } from 'motion/react';
import type { Variants } from 'motion/react';

/**
 * Neutralise un set de variants en gardant uniquement l'état final
 * (pas de transform, pas de fade) si reduced-motion est actif.
 */
export function useResolvedVariants(variants: Variants): Variants {
  const prefersReduced = useReducedMotionMotion();
  if (!prefersReduced) return variants;

  return {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 1, transition: { duration: 0 } },
  };
}

export { useReducedMotionMotion as useReducedMotion };
