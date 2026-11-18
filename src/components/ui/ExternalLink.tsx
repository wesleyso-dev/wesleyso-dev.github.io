import type { ReactNode } from 'react'
import { isPlaceholder, type Href } from '../../content/copy'

type Props = {
  href: Href
  children: ReactNode
  className?: string
  /** Open in a new tab. Use for documents (résumé) rather than profiles. */
  newTab?: boolean
  /** Mark as one of your own profiles (rel="me"), linking identities across sites. */
  me?: boolean
}

/**
 * A link whose destination may not exist yet. A placeholder href renders an
 * inert, visibly-marked label instead of a dead link. `null` renders nothing.
 */
export function ExternalLink({ href, children, className = '', newTab = false, me = false }: Props) {
  if (href === null) return null

  if (isPlaceholder(href)) {
    return (
      <span
        data-tbd
        title={`Placeholder link: ${href.tbd}`}
        className={`cursor-not-allowed decoration-cobalt/50 decoration-dashed decoration-1 underline-offset-4 [text-decoration-line:underline] ${className}`}
      >
        {children}
        <span className="sr-only"> (link coming soon)</span>
      </span>
    )
  }

  const rel = [me && 'me', newTab && 'noreferrer'].filter(Boolean).join(' ') || undefined

  return (
    <a href={href} data-external className={className} rel={rel} target={newTab ? '_blank' : undefined}>
      {children}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
