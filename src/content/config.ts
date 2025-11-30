import { defineCollection, z } from 'astro:content';

const escritorio = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        // Transform string to Date object, default to current date if missing
        pubDate: z.coerce.date().default(() => new Date()),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        category: z.enum(['ensaios', 'dramaturgia', 'poesia', 'autoficções', 'impressões', 'traduções']).optional(),
    }),
});

const citacoes = defineCollection({
    type: 'content',
});

export const collections = { escritorio, citacoes };
