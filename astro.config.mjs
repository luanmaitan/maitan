// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // <--- Importe isso
import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'server', // Enable SSR for dynamic pages
  integrations: [
    tailwind(), // <--- Adicione isso na lista (com a vírgula)
    svelte()
  ]
});