import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { sectionHref } from '../components/layout/nav'
import { Arrow } from '../components/ui/Arrow'
import { ExternalLink } from '../components/ui/ExternalLink'
import { ProjectPlate } from '../components/ui/ProjectPlate'
import { Text } from '../components/ui/Text'
import { plainText, type Href } from '../content/copy'
import { getProject, projectNumber, projects, type Project } from '../content/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { NotFoundPage } from './NotFoundPage'

export function CaseStudyPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage />
  // Keyed so per-project state and focus reset when moving between case studies.
  return <CaseStudy key={project.slug} project={project} />
}

function CaseStudy({ project }: { project: Project }) {
  const { caseStudy } = project
  const next = projects[(projects.indexOf(project) + 1) % projects.length]

  usePageMeta({
    title: `${project.name}, case study`,
    description: plainText(project.tagline, `How ${project.name} was designed and built: decisions, trade-offs and lessons.`),
    path: `/work/${project.slug}`,
  })

  return (
    <article>
      <header className="grid-site pt-10 md:pt-16">
        <p className="col-span-full">
          <Link
            to={sectionHref('work')}
            viewTransition
            className="group label inline-flex min-h-11 items-center gap-2 text-muted hover:text-ink"
          >
            <Arrow direction="left" className="transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>
        </p>

        <p className="label col-span-full mt-10 flex gap-3 text-muted md:mt-16">
          <span className="text-cobalt">{projectNumber(project)}</span> Case study
        </p>
        <h1 tabIndex={-1} className="col-span-full mt-4 text-display font-medium outline-none">
          {project.name}
        </h1>
        <p className="col-span-full mt-6 text-lead text-muted md:col-span-7">
          <Text value={project.tagline} />
        </p>

        <dl className="col-span-full mt-12 grid grid-cols-2 gap-x-(--gutter) gap-y-8 border-t border-rule pt-6 text-small md:mt-16 md:grid-cols-4">
          <MetaItem term="Role">
            <Text value={project.role} />
          </MetaItem>
          <MetaItem term="Timeline">
            <Text value={project.period} />
          </MetaItem>
          <MetaItem term="Stack">
            <ul>
              {project.stack.map((tech, i) => (
                <li key={i}>
                  <Text value={tech} />
                </li>
              ))}
            </ul>
          </MetaItem>
          <MetaItem term="Links">
            <ul className="space-y-1">
              <LinkItem href={project.links.repo} label="Source code" absent="Private repository" />
              <LinkItem href={project.links.live} label="Live site" absent="No public demo" />
            </ul>
          </MetaItem>
        </dl>
      </header>

      <div className="mt-12 px-(--gutter) md:mt-16">
        <ProjectPlate project={project} aspect="wide" className="mx-auto max-w-[85rem]" />
      </div>

      <div className="mt-20 space-y-20 md:mt-32 md:space-y-28">
        <Chapter number="01" title="Overview">
          <p className="text-lead">
            <Text value={caseStudy.overview} />
          </p>
        </Chapter>

        <Chapter number="02" title="The problem">
          <p>
            <Text value={caseStudy.problem} />
          </p>
        </Chapter>

        <Chapter number="03" title="What I built">
          <ul className="space-y-4">
            {caseStudy.built.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" aria-hidden="true" />
                <span>
                  <Text value={item} />
                </span>
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter number="04" title="Key decisions">
          <ol className="space-y-10">
            {caseStudy.decisions.map((decision, i) => (
              <li key={i} className="border-t border-rule pt-5">
                <h3 className="flex gap-4 text-lead font-medium">
                  <span className="label pt-1.5 text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <Text value={decision.title} />
                </h3>
                <dl className="mt-4 grid gap-4 pl-9 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <dt className="label text-muted">Why</dt>
                    <dd className="mt-1">
                      <Text value={decision.rationale} />
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-muted">Trade-off</dt>
                    <dd className="mt-1">
                      <Text value={decision.tradeoff} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter number="05" title="Challenges">
          <div className="space-y-8">
            {caseStudy.challenges.map((challenge, i) => (
              <div key={i}>
                <h3 className="font-medium">
                  <Text value={challenge.title} />
                </h3>
                <p className="mt-2 text-muted">
                  <Text value={challenge.body} />
                </p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter number="06" title="Outcome">
          <p>
            <Text value={caseStudy.outcome} />
          </p>
        </Chapter>

        <Chapter number="07" title="What I learned">
          <ul className="space-y-3">
            {caseStudy.learnings.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" aria-hidden="true" />
                <span>
                  <Text value={item} />
                </span>
              </li>
            ))}
          </ul>
        </Chapter>
      </div>

      <nav aria-label="Next case study" className="grid-site mt-32 md:mt-48">
        <Link
          to={`/work/${next.slug}`}
          viewTransition
          className="group col-span-full flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-6"
        >
          <span className="label text-muted">Next case study</span>
          <span className="flex items-center gap-4 text-headline font-medium transition-colors group-hover:text-cobalt">
            {next.name}
            <Arrow className="transition-transform duration-500 ease-out-quart group-hover:translate-x-2" />
          </span>
        </Link>
      </nav>
    </article>
  )
}

function MetaItem({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label text-muted">{term}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  )
}

function LinkItem({ href, label, absent }: { href: Href; label: string; absent: string }) {
  if (href === null) return <li className="text-muted">{absent}</li>
  return (
    <li>
      <ExternalLink href={href} className="group inline-flex items-center gap-1.5">
        <span className="link-draw">{label}</span>
        <Arrow direction="up-right" />
      </ExternalLink>
    </li>
  )
}

/** A case-study chapter: sticky label in the margin, prose in a readable measure. */
function Chapter({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  const id = title.toLowerCase().replace(/\W+/g, '-')
  return (
    <section aria-labelledby={id} className="grid-site">
      <div className="col-span-full mb-6 md:col-span-3 md:mb-0">
        <h2 id={id} className="label flex gap-3 text-muted md:sticky md:top-[calc(var(--header-height)+2rem)]">
          <span className="text-cobalt">{number}</span>
          {title}
        </h2>
      </div>
      <div className="col-span-full max-w-[65ch] md:col-span-7 md:col-start-5">{children}</div>
    </section>
  )
}
