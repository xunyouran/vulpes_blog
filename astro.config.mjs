// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // When deploying to GitHub Pages as a project site, set base to '/<repo-name>'
  // For Vercel or user site (username.github.io), leave as '/'
  site: 'https://xunyouran.github.io',
  base: '/-vulpes_blog/',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
