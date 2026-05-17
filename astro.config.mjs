import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://nilsbronner.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],
  // Routing i18n natif Astro activé en Sprint 3 (quand les pages EN existeront).
  // Pour Sprint 1, FR-only — les helpers src/lib/i18n.ts sont prêts mais inertes.
});
