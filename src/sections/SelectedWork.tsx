import { SectionHeading } from '../components/ui/SectionHeading'
import { projects } from '../content/projects'
import { ProjectCard } from './ProjectCard'

/**
 * Asymmetric two-up layout on desktop: a wide card against a narrow, dropped
 * one, then the reverse. Placement is cyclic so adding projects keeps the rhythm.
 */
const layout = [
  { className: 'md:col-span-7 md:col-start-1', aspect: 'landscape' },
  { className: 'md:col-span-4 md:col-start-9 md:mt-40', aspect: 'portrait' },
  { className: 'md:col-span-6 md:col-start-4', aspect: 'landscape' },
  { className: 'md:col-span-4 md:col-start-2', aspect: 'portrait' },
  { className: 'md:col-span-6 md:col-start-7 md:mt-32', aspect: 'landscape' },
] as const

export function SelectedWork() {
  return (
    <section aria-labelledby="work">
      <SectionHeading id="work" number="01" label="Work">
        Selected work
      </SectionHeading>

      <div className="grid-site mt-12 gap-y-20 md:mt-20 md:gap-y-28">
        {projects.map((project, i) => {
          const slot = layout[i % layout.length]
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              aspect={slot.aspect}
              className={`col-span-full ${slot.className}`}
            />
          )
        })}
      </div>
    </section>
  )
}
