import { Arrow } from '../components/ui/Arrow'
import { CopyButton } from '../components/ui/CopyButton'
import { ExternalLink } from '../components/ui/ExternalLink'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Text } from '../components/ui/Text'
import { isPlaceholder, type Href } from '../content/copy'
import { links } from '../content/site'

const channels: { label: string; detail: string; href: Href; newTab?: boolean; me?: boolean }[] = [
  { label: 'GitHub', detail: 'Code & experiments', href: links.github, me: true },
  { label: 'LinkedIn', detail: 'Work history', href: links.linkedin, me: true },
  { label: 'Résumé', detail: 'PDF', href: links.resume, newTab: true },
]

export function Contact() {
  const email = links.email

  return (
    <section aria-labelledby="contact" className="mt-32 md:mt-48">
      <SectionHeading id="contact" number="04" label="Contact">
        Have a role or a project in mind? <span className="text-muted">I’d like to hear about it.</span>
      </SectionHeading>

      <div className="grid-site mt-12 gap-y-14 md:mt-20">
        <div className="col-span-full md:col-span-5 md:col-start-4">
          <p className="label mb-3 text-muted">Email</p>
          {isPlaceholder(email) ? (
            <p className="text-lead">
              <Text value={email} />
            </p>
          ) : (
            <div className="flex flex-wrap items-baseline gap-x-6">
              <a href={`mailto:${email}`} className="link-prose text-title font-medium break-all">
                {email}
              </a>
              <CopyButton text={email} label="Copy address" />
            </div>
          )}
        </div>

        <ul className="col-span-full border-t border-ink md:col-span-4 md:col-start-9">
          {channels.map((channel) => (
            <li key={channel.label} className="border-b border-rule">
              <ExternalLink
                href={channel.href}
                newTab={channel.newTab}
                me={channel.me}
                className="group flex min-h-14 items-center gap-4 py-3"
              >
                <span className="flex-1 font-medium transition-colors group-hover:text-cobalt">{channel.label}</span>
                <span className="label text-muted">{channel.detail}</span>
                <Arrow
                  direction="up-right"
                  className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
