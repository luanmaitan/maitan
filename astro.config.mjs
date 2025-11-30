// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import wikiLinkPlugin from 'remark-wiki-link';

export default defineConfig({
  output: 'static', // Changed to static for better performance (Digital Garden best practice)
  adapter: vercel(),
  markdown: {
    remarkPlugins: [
        [wikiLinkPlugin, { 
            hrefTemplate: (permalink) => `/${permalink}`, // Link directly to slug
            aliasDivider: '|' // Support [[Link|Text]] syntax
        }]
    ],
    shikiConfig: {
      theme: 'css-variables', // Allows CSS styling of code blocks
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false, // We control this in global.css
    }),
    svelte()
  ]
});
