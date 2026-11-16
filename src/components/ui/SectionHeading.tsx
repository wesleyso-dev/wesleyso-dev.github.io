import type { ReactNode } from 'react'

type Props = {
  id: string
  number: string
  label: string
  /** Optional large title beside the label. */
  children?: ReactNode
}

/**
 * Every homepage section opens the same way: a hairline rule, a mono index
 * number and label in the left margin, and an optional title on the right.
 */
export function SectionHeading({ id, number, label, children }: Props) {
  return (
    <header className="grid-site">
      <div className="col-span-full border-t border-ink pt-4" />
      <p className="label col-span-2 flex gap-3 text-muted md:col-span-3" aria-hidden="true">
        <span className="text-cobalt">{number}</span>
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="col-span-full mt-8 text-headline font-medium md:col-span-9 md:mt-0"
      >
        {children ?? label}
      </h2>
    </header>
  )
}
