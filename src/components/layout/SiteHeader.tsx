import { Link, useLocation } from 'react-router'
import { links, site } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Arrow } from '../ui/Arrow'
import { ExternalLink } from '../ui/ExternalLink'
import { navItems, sectionHref } from './nav'

const sectionIds = navItems.map((item) => item.id)

type Props = {
  menuOpen: boolean
  onToggleMenu: () => void
}

export function SiteHeader({ menuOpen, onToggleMenu }: Props) {
  const scrolled = useScrolled()
  const raised = scrolled || menuOpen
  const { pathname } = useLocation()
  const active = useActiveSection(sectionIds, pathname === '/')

  return (
    <header
      className={`sticky top-0 z-50 h-(--header-height) bg-paper transition-[box-shadow] duration-300 ${
        raised ? 'shadow-[0_1px_0_var(--color-rule)]' : ''
      }`}
    >
      <div className="grid-site h-full items-center">
        <Link
          to="/"
          viewTransition
          className="group col-span-2 flex items-center gap-2.5 justify-self-start font-medium tracking-tight md:col-span-3"
        >
          <span
            className="size-2.5 bg-cobalt transition-transform duration-500 ease-out-quart group-hover:rotate-45"
            aria-hidden="true"
          />
          {site.name}
          <span className="sr-only">, home</span>
        </Link>

        <nav aria-label="Primary" className="col-span-7 col-start-4 hidden md:block">
          <ul className="flex gap-8">
            {navItems.map((item) => {
              const current = item.id === active
              return (
                <li key={item.id}>
                  <Link
                    to={sectionHref(item.id)}
                    aria-current={current ? 'location' : undefined}
                    className="group flex items-baseline gap-1.5 text-small"
                  >
                    <span
                      className={`label text-[0.625rem] transition-colors group-hover:text-cobalt ${
                        current ? 'text-cobalt' : 'text-muted'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="link-draw">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="col-span-2 hidden justify-self-end md:block">
          <ExternalLink href={links.resume} newTab className="group label inline-flex items-center gap-1.5">
            Résumé
            <Arrow
              direction="up-right"
              className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </ExternalLink>
        </div>

        <button
          type="button"
          className="label col-span-2 inline-flex min-h-11 items-center gap-3 justify-self-end md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          {menuOpen ? 'Close' : 'Menu'}
          <span className="relative block h-2 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ease-out-quart ${
                menuOpen ? 'top-1 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ease-out-quart ${
                menuOpen ? 'top-1 -rotate-45' : 'top-2'
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  )
}
