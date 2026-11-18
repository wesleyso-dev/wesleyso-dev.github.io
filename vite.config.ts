import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * GitHub Pages has no SPA rewrites. Two things make deep links work:
 *
 * - 404.html: the app shell, so any unknown URL still boots the router.
 * - work/<slug>.html for every case study in the sitemap. Pages serves
 *   /work/sysscout from work/sysscout.html with a 200 status, so crawlers
 *   index case studies instead of seeing a 404 response.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const shell = resolve(outDir, 'index.html')
      await copyFile(shell, resolve(outDir, '404.html'))

      const sitemap = await readFile(resolve(outDir, 'sitemap.xml'), 'utf8')
      const slugs = [...sitemap.matchAll(/\/work\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1])
      await mkdir(resolve(outDir, 'work'), { recursive: true })
      await Promise.all(slugs.map((slug) => copyFile(shell, resolve(outDir, 'work', `${slug}.html`))))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
})
