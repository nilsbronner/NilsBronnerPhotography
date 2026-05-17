import { defineCollection, z } from 'astro:content';

/**
 * Schéma des case studies. Toutes les chaînes éditoriales (texte du brief,
 * crédits, livrables) viennent du MDX — le frontmatter ne porte que la
 * structure et les métadonnées indexables.
 */
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      client: z.string(),
      year: z.number().int().min(2000).max(2100),
      role: z.string(),
      deliverables: z.array(z.string()).default([]),
      tags: z.array(
        z.enum([
          'commercial',
          'personal',
          'architecture',
          'brand',
          'editorial',
          'event',
          'portrait',
        ]),
      ),
      featured: z.boolean().default(false),
      order: z.number().int().default(100),
      heroImage: image().optional(),
      thumbnail: image().optional(),
      summary: z.string().max(200),
      credits: z
        .object({
          agency: z.string().optional(),
          director: z.string().optional(),
          production: z.string().optional(),
          retouching: z.string().optional(),
        })
        .partial()
        .optional(),
      locale: z.enum(['fr', 'en']).default('fr'),
    }),
});

export const collections = { projects };
