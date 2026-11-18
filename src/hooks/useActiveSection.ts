import { useEffect, useState } from 'react'

/**
 * Which of the given sections is currently being read: the one crossing a
 * line ~40% down the viewport. Sections are found by `aria-labelledby={id}`.
 * Pass `enabled: false` on pages without those sections.
 */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!enabled) return

    const sections = key
      .split(',')
      .map((id) => document.querySelector<HTMLElement>(`section[aria-labelledby="${id}"]`))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute('aria-labelledby'))
        }
      },
      // A thin band 40% from the top: exactly one section is in it at a time.
      { rootMargin: '-40% 0px -59% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key, enabled])

  return enabled ? active : null
}
