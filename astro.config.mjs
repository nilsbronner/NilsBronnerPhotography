import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://nilsbronner.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    react(),
    icon(),
  ],
  // Sitemap : génération manuelle via src/pages/sitemap.xml.ts (incompat
  // @astrojs/sitemap 3.x avec Astro 4.16+ — bug build:done).
  // Routing i18n natif activé en Sprint 3.
});
