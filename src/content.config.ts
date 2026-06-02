import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      // Required fields
      title: z
        .string({ required_error: 'Every post needs a title' })
        .max(120, 'Title must be under 120 characters'),
      description: z
        .string({ required_error: 'Every post needs a description' })
        .max(200, 'Description must be under 200 characters'),
      pubDate: z.coerce.date({ required_error: 'Publication date is required' }),

      // Optional metadata
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),

      // Classification
      tags: z
        .array(z.string())
        .default([])
        .refine((tags) => tags.length <= 5, 'Max 5 tags per post'),
      category: z.string().default('general'),

      // Publishing control
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),

      // SEO / Social
      canonicalURL: z.string().url().optional(),
      ogImage: z.string().optional(),
    }),
});

export const collections = { blog: blogCollection };
