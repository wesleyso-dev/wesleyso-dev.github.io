import { projectIndex, projectNumber, type Project } from '../../content/projects'

/**
 * Typographic cover for a project: a Swiss-poster plate with the name set
 * large and cropped by the frame. Used on the card and the case-study hero;
 * the shared view-transition-name lets the browser morph one into the other.
 *
 * Text is sized in container units so the composition holds at any width.
 */

// Where the accent square sits, per project, so the set of plates reads as a series.
const accentPositions = [
  'top-[18%] left-[62%]',
  'top-[30%] left-[24%]',
  'top-[14%] left-[44%]',
  'top-[36%] left-[74%]',
]

type Props = {
  project: Project
  aspect?: 'landscape' | 'portrait' | 'wide'
  className?: string
}

const aspectClass = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  wide: 'aspect-[16/9] md:aspect-[21/9]',
}

export function ProjectPlate({ project, aspect = 'landscape', className = '' }: Props) {
  const index = Math.max(0, projectIndex(project))

  return (
    <div
      aria-hidden="true"
      className={`@container relative overflow-hidden bg-plate ${aspectClass[aspect]} ${className}`}
      style={{ viewTransitionName: `plate-${project.slug}` }}
    >
      {/* Column guides: quarter divisions, the same structure as the site grid. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-rule) 1px, transparent 1px)',
          backgroundSize: '25% 100%',
          backgroundPosition: '-1px 0',
        }}
      />

      <span className="label absolute top-[4cqw] left-[4cqw] text-[clamp(0.625rem,2.2cqw,0.8125rem)] text-muted">
        {projectNumber(project)}
      </span>
      <span className="label absolute top-[4cqw] right-[4cqw] text-[clamp(0.625rem,2.2cqw,0.8125rem)] text-muted">
        Case study
      </span>

      <span
        className={`absolute size-[7cqw] bg-cobalt transition-transform duration-700 ease-out-quart group-hover:translate-x-[3cqw] group-hover:rotate-90 ${
          accentPositions[index % accentPositions.length]
        }`}
      />

      <span className="absolute bottom-0 left-[3cqw] block translate-y-[22%] text-[19cqw] leading-none font-semibold tracking-[-0.055em] whitespace-nowrap text-ink transition-transform duration-700 ease-out-quart group-hover:translate-y-[14%]">
        {project.name}
      </span>
    </div>
  )
}
