import { useEffect } from 'react'
import { site } from '../content/site'

type Meta = {
  /** Page-specific title; the site name is appended. Omit for the homepage. */
  title?: string
  description?: string
  /** Path for the canonical URL, e.g. "/work/sysscout". */
  path: string
}

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/**
 * Updates the tags already declared in index.html for client-side routes.
 * index.html holds the homepage values, so crawlers that skip JS still get them.
 */
export function usePageMeta({ title, description = site.description, path }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Portfolio`
    const url = new URL(path, site.url).href

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [title, description, path])
}
