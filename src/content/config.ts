import { defineCollection, z } from 'astro:content';

const escritorio = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        category: z.enum(['ensaios', 'dramaturgia', 'poesia', 'autoficções', 'impressões', 'traduções']).optional(),
    }),
});

export const collections = { escritorio };
