import { Link } from 'react-router'
import { Arrow } from '../components/ui/Arrow'
import { ProjectPlate } from '../components/ui/ProjectPlate'
import { Text } from '../components/ui/Text'
import { projectNumber, type Project } from '../content/projects'

type Props = {
  project: Project
  aspect: 'landscape' | 'portrait'
  className?: string
}

/**
 * The whole card is one link (one tab stop, one accessible name from the
 * heading), with the details read in order: name, period, tagline, stack.
 */
export function ProjectCard({ project, aspect, className = '' }: Props) {
  const headingId = `project-${project.slug}`

  return (
    <article aria-labelledby={headingId} className={className}>
      <Link to={`/work/${project.slug}`} viewTransition className="group block">
        <ProjectPlate project={project} aspect={aspect} />

        <div className="mt-5 flex items-baseline gap-4 border-b border-rule pb-3">
          <span className="label text-muted">{projectNumber(project)}</span>
          <h3 id={headingId} className="flex-1 text-title font-medium transition-colors group-hover:text-cobalt">
            {project.name}
          </h3>
          <span className="label text-muted">
            <Text value={project.period} />
          </span>
        </div>

        <p className="mt-4 max-w-[46ch] text-muted">
          <Text value={project.tagline} />
        </p>

        <ul className="label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-muted" aria-label="Built with">
          {project.stack.map((tech, i) => (
            <li key={i}>
              <Text value={tech} />
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center gap-2 text-small font-medium text-cobalt">
          <span className="link-draw">Read the case study</span>
          <Arrow className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  )
}
