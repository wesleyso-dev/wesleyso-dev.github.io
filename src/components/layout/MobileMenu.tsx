import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { links } from '../../content/site'
import { Arrow } from '../ui/Arrow'
import { ExternalLink } from '../ui/ExternalLink'
import { navItems, sectionHref } from './nav'

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * Full-height sheet below the header on small screens. The rest of the page
 * is made `inert` by the layout while this is open, which keeps keyboard and
 * screen-reader focus inside the header + menu without a focus-trap library.
 */
export function MobileMenu({ open, onClose }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    // Deferred a frame: on touch devices the tap sequence would otherwise
    // hand focus back to the toggle button after this runs.
    const frame = requestAnimationFrame(() => firstLink.current?.focus())
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onResize = () => desktop.matches && onClose()

    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      cancelAnimationFrame(frame)
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={`fixed inset-x-0 top-(--header-height) bottom-0 z-40 flex flex-col overflow-y-auto bg-paper px-(--gutter) pb-8 duration-300 md:hidden ${
        // Visibility flips instantly on open (so focus can land), and only
        // after the fade on close.
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]'
      }`}
    >
      <nav aria-label="Mobile" className="flex-1 pt-6">
        <ul>
          {navItems.map((item, i) => (
            <li
              key={item.id}
              className={`border-b border-rule transition-[opacity,translate] duration-500 ease-out-quart ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + i * 50}ms` : '0ms' }}
            >
              <Link
                ref={i === 0 ? firstLink : undefined}
                to={sectionHref(item.id)}
                onClick={onClose}
                className="flex items-baseline justify-between py-4 text-title font-medium"
              >
                {item.label}
                <span className="label text-muted">{item.number}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="label mt-10 flex flex-wrap gap-x-6 gap-y-3">
        <li>
          <ExternalLink href={links.github} className="inline-flex items-center gap-1.5 py-2">
            GitHub <Arrow direction="up-right" />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.linkedin} className="inline-flex items-center gap-1.5 py-2">
            LinkedIn <Arrow direction="up-right" />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.resume} newTab className="inline-flex items-center gap-1.5 py-2">
            Résumé <Arrow direction="up-right" />
          </ExternalLink>
        </li>
      </ul>
    </div>
  )
}
