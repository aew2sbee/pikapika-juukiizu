import { defineConfig } from 'vite';

// BASE_PATH is set by the PR preview workflow (e.g. /pikapika-juukiizu/pr-preview/pr-1/).
const base = process.env.BASE_PATH ?? '/pikapika-juukiizu/';
const isPreview = process.env.VITE_DEPLOY_ENV === 'preview';

export default defineConfig({
  base,
  plugins: [
    {
      // Keep PR previews out of search engines.
      name: 'preview-noindex',
      transformIndexHtml: () =>
        isPreview
          ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' }]
          : [],
    },
  ],
});
