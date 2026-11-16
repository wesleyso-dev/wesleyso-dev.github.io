export type NavItem = { id: string; label: string; number: string }

/** Homepage sections, in page order. `id` is the section's anchor. */
export const navItems: NavItem[] = [
  { id: 'work', label: 'Work', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'contact', label: 'Contact', number: '04' },
]

export const sectionHref = (id: string) => ({ pathname: '/', hash: `#${id}` })
