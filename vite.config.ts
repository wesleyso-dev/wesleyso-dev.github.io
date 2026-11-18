import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
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
 *   index case studies instead of seeing a 404 response. Each file's
 *   canonical and og:url point at its own URL, not the homepage, so the
 *   pages aren't treated as duplicates of it.
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

      const html = await readFile(shell, 'utf8')
      const sitemap = await readFile(resolve(outDir, 'sitemap.xml'), 'utf8')
      const pages = [...sitemap.matchAll(/<loc>([^<]*\/work\/([a-z0-9-]+))<\/loc>/g)]

      await mkdir(resolve(outDir, 'work'), { recursive: true })
      await Promise.all(
        pages.map(([, url, slug]) =>
          writeFile(
            resolve(outDir, 'work', `${slug}.html`),
            html
              .replace(/(rel="canonical" href=")[^"]*/, `$1${url}`)
              .replace(/(property="og:url" content=")[^"]*/, `$1${url}`),
          ),
        ),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
})
