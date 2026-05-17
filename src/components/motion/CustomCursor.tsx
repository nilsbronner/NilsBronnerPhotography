import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Curseur custom — apparaît uniquement au survol des éléments
 * marqués data-cursor="view". Discret par défaut, mot "VIEW" en serif
 * sur survol d'une image. Pas de cliché magnétique.
 *
 * Mobile / touch : désactivé automatiquement.
 * Reduced-motion : désactivé.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('VIEW');
  const [isCoarse, setIsCoarse] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 30 });
  const sy = useSpring(y, { stiffness: 280, damping: 30 });

  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isCoarse || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const node = t?.closest?.('[data-cursor]') as HTMLElement | null;
      if (node) {
        setLabel(node.dataset.cursor || 'VIEW');
        setVisible(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const node = t?.closest?.('[data-cursor]');
      if (node) setVisible(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [isCoarse, reduced, x, y]);

  if (isCoarse || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] flex items-center justify-center"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="bg-ink text-bg text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-full font-sans">
        {label}
      </span>
    </motion.div>
  );
}
