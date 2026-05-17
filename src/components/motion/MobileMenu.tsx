import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { DURATION, EASE_OUT_SOFT } from '@/lib/motion-config';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
}

export default function MobileMenu({
  items,
  openLabel,
  closeLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  // Lock scroll when open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const dur = reduced ? 0 : DURATION.base;

  return (
    <>
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="relative block w-6 h-px bg-ink">
          <span
            className="absolute left-0 top-[-6px] block w-6 h-px bg-ink transition-transform"
            style={{
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="absolute left-0 top-[6px] block w-6 h-px bg-ink transition-transform"
            style={{
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur, ease: EASE_OUT_SOFT }}
            className="fixed inset-0 z-30 bg-bg md:hidden"
          >
            <nav className="container-page pt-24 pb-12 h-full">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="heading-serif text-4xl block"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
