import { site } from '../../content/site'
import { Arrow } from '../ui/Arrow'

const sourceUrl = 'https://github.com/wesleyso-dev/wesleyso-dev.github.io'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-32 md:mt-48">
      <div className="grid-site label gap-y-4 border-t border-rule py-8 text-muted">
        <p className="col-span-full md:col-span-3">
          © {year} {site.name}
        </p>
        <p className="col-span-full normal-case tracking-normal md:col-span-6">
          Designed and built with React, TypeScript and Tailwind CSS. Set in Instrument Sans, Newsreader and IBM Plex
          Mono.{' '}
          <a href={sourceUrl} data-external className="link-prose whitespace-nowrap text-ink">
            View source
          </a>
        </p>
        <p className="col-span-full md:col-span-3 md:justify-self-end">
          <a href="#top" className="group inline-flex items-center gap-1.5 hover:text-ink">
            Back to top
            <Arrow
              direction="up"
              className="transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5"
            />
          </a>
        </p>
      </div>
    </footer>
  )
}
