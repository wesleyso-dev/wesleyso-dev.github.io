import { useEffect, useRef, useState } from 'react'

const messages = { idle: '', copied: 'Copied', failed: 'Copy failed' } as const

/**
 * Copies text to the clipboard and confirms inline. The button keeps a stable
 * accessible name; the result is announced through a separate status region.
 */
export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<keyof typeof messages>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className="label inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
      >
        <span
          className={`size-1.5 rounded-full transition-colors duration-300 ${
            state === 'copied' ? 'bg-cobalt' : state === 'failed' ? 'bg-ink' : 'bg-rule'
          }`}
          aria-hidden="true"
        />
        <span aria-hidden="true">{messages[state] || label}</span>
      </button>
      <span role="status" className="sr-only">
        {messages[state]}
      </span>
    </>
  )
}
