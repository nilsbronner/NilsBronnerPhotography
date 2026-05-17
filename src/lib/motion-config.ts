/**
 * Configuration Motion centralisée.
 *
 * Source unique pour TOUTES les animations du site.
 * Aucun composant ne doit redéfinir d'animation ad hoc.
 *
 * Règles strictes :
 *  - durée plafond 1000ms, idéal 400-700ms
 *  - easing soft, jamais easeInOut / bounce / elastic
 *  - pas de scale > 1.05, pas de rotation 3D, pas de blur dynamique
 */

import type { Transition, Variants } from 'motion/react';

// === Constantes ===

/** Ease-out doux — signature Motion. Utilisé pour toutes les entrées. */
export const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Durées standards en secondes. */
export const DURATION = {
  fast: 0.3,   // hover image
  base: 0.5,   // fades simples
  slow: 0.7,   // page transitions, hero
} as const;

/** Spring calme — jamais bouncy. */
export const SPRING_SOFT: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

// === Transitions réutilisables ===

export const smoothTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT_SOFT,
};

export const springTransition: Transition = SPRING_SOFT;

// === Variants standards ===

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE_OUT_SOFT },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_SOFT },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_SOFT },
  },
};

/** Viewport par défaut pour whileInView — déclenchement avant le bord. */
export const REVEAL_VIEWPORT = { once: true, margin: '-10%' } as const;

/** Stagger max autorisé entre items. Au-delà = effet cascade rigide. */
export const STAGGER_MAX = 0.08;
