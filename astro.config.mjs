// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server', // Enable SSR for dynamic pages
  adapter: vercel(),
  integrations: [
    tailwind(),
    svelte()
  ]
});