/**
 * Content that has not been written yet.
 *
 * Every piece of copy on the site is a `Copy`: either a real string, or a
 * placeholder created with `tbd()`. Placeholders render with a visible
 * "TBD" treatment, so missing content cannot slip into production unnoticed.
 *
 * To find everything still to write:  grep -rn "tbd(" src/content
 */
export type Placeholder = { readonly tbd: string }
export type Copy = string | Placeholder

export const tbd = (prompt: string): Placeholder => ({ tbd: prompt })

export const isPlaceholder = (value: Copy): value is Placeholder =>
  typeof value === 'object' && value !== null && 'tbd' in value

/** Plain text for attributes, <title> and meta tags. Placeholders resolve to the fallback. */
export const plainText = (value: Copy, fallback = ''): string =>
  isPlaceholder(value) ? fallback : value

/** A URL that may not exist yet. `null` means intentionally absent (e.g. no public demo). */
export type Href = string | Placeholder | null
