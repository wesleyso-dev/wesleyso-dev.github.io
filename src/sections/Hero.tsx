import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { sectionHref } from '../components/layout/nav'
import { Arrow } from '../components/ui/Arrow'
import { ExternalLink } from '../components/ui/ExternalLink'
import { Text } from '../components/ui/Text'
import { projectNumber, projects } from '../content/projects'
import { links, site } from '../content/site'

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid-site pt-14 pb-24 md:pt-24 md:pb-36">
      <p className="intro label col-span-full flex flex-wrap gap-x-3 text-muted" style={stagger(0)}>
        <span className="text-ink">{site.name}</span>
        <span aria-hidden="true">/</span>
        <Text value={site.role} />
      </p>

      <h1
        id="hero-title"
        tabIndex={-1}
        className="intro col-span-full mt-6 text-display font-medium outline-none md:col-span-11 md:mt-8"
        style={stagger(1)}
      >
        I build software that’s{' '}
        {/* leading-[0]: the serif's taller metrics would otherwise stretch this line box. */}
        <em className="font-serif leading-[0] font-normal tracking-[-0.03em] text-cobalt italic">considered</em>, from the
        architecture to the last pixel.
      </h1>

      {/* Lower band: three columns that stack on mobile in reading order. */}
      <div className="col-span-full mt-14 grid grid-cols-subgrid gap-y-14 md:mt-24">
        <div className="intro col-span-full md:col-span-4 md:col-start-5 md:row-start-1" style={stagger(2)}>
          <p className="text-lead">
            I’m Wesley, a Data Science student at UC Berkeley. I founded Brassflows, a trumpet-practice platform
            with 33,000+ users, and I’m prototyping new Yahoo Mail features as a contract software engineer.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to={sectionHref('work')}
              className="group inline-flex min-h-11 items-center gap-2 font-medium text-cobalt"
            >
              <span className="link-draw">View selected work</span>
              <Arrow
                direction="down"
                className="transition-transform duration-300 ease-out-quart group-hover:translate-y-0.5"
              />
            </Link>
            <ExternalLink href={links.github} className="group inline-flex min-h-11 items-center gap-2">
              <span className="link-draw">GitHub</span>
              <Arrow
                direction="up-right"
                className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </ExternalLink>
          </div>
        </div>

        <dl
          className="intro col-span-full grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 self-end text-small md:col-span-3 md:col-start-1 md:row-start-1"
          style={stagger(3)}
        >
          {site.facts.map((fact) => (
            <div key={fact.term} className="contents">
              <dt className="label pt-0.5 text-muted">{fact.term}</dt>
              <dd>
                <Text value={fact.detail} />
              </dd>
            </div>
          ))}
        </dl>

        <nav
          aria-labelledby="hero-index"
          className="intro col-span-full self-end md:col-span-3 md:col-start-10 md:row-start-1"
          style={stagger(4)}
        >
          <h2 id="hero-index" className="label mb-3 text-muted">
            Index
          </h2>
          <ol className="border-t border-rule">
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-rule">
                <Link
                  to={`/work/${project.slug}`}
                  viewTransition
                  className="group flex min-h-11 items-center gap-4 py-2 transition-colors hover:text-cobalt"
                >
                  <span className="label text-muted">{projectNumber(project)}</span>
                  <span className="flex-1 font-medium">{project.name}</span>
                  <Arrow className="-translate-x-1 opacity-0 transition-[opacity,translate] duration-300 ease-out-quart group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
