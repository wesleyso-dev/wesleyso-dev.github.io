import { isPlaceholder, type Copy } from '../../content/copy'

/**
 * Renders a piece of `Copy`. Real strings render as-is; placeholders render
 * as a dashed, clearly-labelled slot so unfinished content is obvious.
 */
export function Text({ value }: { value: Copy }) {
  if (!isPlaceholder(value)) return <>{value}</>

  return (
    <span
      data-tbd
      title="Placeholder: content still to be written"
      className="rounded-[2px] bg-cobalt/[0.06] px-1 text-cobalt-deep outline-1 -outline-offset-1 outline-cobalt/40 outline-dashed [box-decoration-break:clone]"
    >
      <span className="label mr-1.5 align-[0.12em] text-[0.625rem] font-medium" aria-hidden="true">
        TBD
      </span>
      {value.tbd}
    </span>
  )
}
