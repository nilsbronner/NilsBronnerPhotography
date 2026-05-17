import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://nilsbronner.com';

/**
 * Sitemap manuel. Remplace @astrojs/sitemap (incompat avec Astro 4.16+).
 * Énumère les routes statiques + les routes dynamiques /work/[slug]
 * à partir de la Content Collection.
 */
export const GET: APIRoute = async () => {
  const staticRoutes = ['/', '/work', '/about', '/services', '/contact'];

  const projects = await getCollection('projects');
  const projectRoutes = projects
    .filter((p) => p.data.locale === 'fr')
    .map((p) => `/work/${p.slug}`);

  const urls = [...staticRoutes, ...projectRoutes]
    .map(
      (path) =>
        `  <url><loc>${SITE}${path}</loc><changefreq>monthly</changefreq></url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
