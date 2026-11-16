import { SectionHeading } from '../components/ui/SectionHeading'
import { Text } from '../components/ui/Text'
import { credentials, experience, leadership, skills, type Role } from '../content/site'

export function Experience() {
  return (
    <section aria-labelledby="experience" className="mt-32 md:mt-48">
      <SectionHeading id="experience" number="03" label="Experience">
        Experience &amp; toolkit
      </SectionHeading>

      <RoleList roles={experience} className="mt-12 md:mt-20" />

      <div className="grid-site mt-16 md:mt-20">
        <h3 className="label col-span-full mb-4 text-muted">Leadership</h3>
      </div>
      <RoleList roles={leadership} />

      <div className="grid-site mt-16 gap-y-10 md:mt-24">
        {credentials.map((item) => (
          <div key={item.kind} className="col-span-full border-t border-ink pt-3 md:col-span-4">
            <p className="label text-muted">{item.kind}</p>
            <p className="mt-3 font-medium">{item.title}</p>
            <p className="mt-1 text-small text-muted">
              <Text value={item.detail} />
            </p>
          </div>
        ))}
      </div>

      <div className="grid-site mt-16 md:mt-24">
        <h3 className="label col-span-full mb-6 text-muted md:col-span-3 md:mb-0">Toolkit</h3>
        <div className="col-span-full grid grid-cols-2 gap-x-(--gutter) gap-y-10 md:col-span-9 md:grid-cols-4">
          {skills.map((group) => (
            <div key={group.label}>
              <h4 className="border-b border-ink pb-2 text-small font-medium">{group.label}</h4>
              <ul className="mt-3 space-y-1.5 text-small text-muted">
                {group.items.map((item, i) => (
                  <li key={i}>
                    <Text value={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleList({ roles, className = '' }: { roles: Role[]; className?: string }) {
  return (
    <ol className={className}>
      {roles.map((role) => (
        <li key={`${role.org}-${role.period}`} className="grid-site">
          <div className="col-span-full grid grid-cols-subgrid gap-y-2 border-t border-rule py-6 md:py-8">
            <p className="label col-span-full pt-1 text-muted md:col-span-3">{role.period}</p>
            <h3 className="col-span-full font-medium md:col-span-4">
              {role.title}
              <span className="block font-normal text-muted">{role.org}</span>
            </h3>
            <p className="col-span-full text-muted md:col-span-5">{role.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
