import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { MobileMenu } from './MobileMenu'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const { pathname } = useLocation()

  // On client-side page changes, move focus to the new page's heading so
  // screen-reader and keyboard users start at the top of the new content.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div id="top">
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[60] -translate-y-20 bg-ink px-3 py-2 text-paper focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <main id="main" tabIndex={-1} inert={menuOpen} className="outline-none">
        <Outlet />
      </main>
      <div inert={menuOpen}>
        <SiteFooter />
      </div>

      <ScrollRestoration />
    </div>
  )
}
