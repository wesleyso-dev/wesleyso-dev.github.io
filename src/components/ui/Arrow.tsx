type Direction = 'right' | 'left' | 'down' | 'up' | 'up-right'

const rotation: Record<Direction, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
  'up-right': -45,
}

/** A hairline arrow drawn to sit on the text baseline at 1em. Decorative. */
export function Arrow({ direction = 'right', className = '' }: { direction?: Direction; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 ${className}`}
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
    >
      <path d="M2 8h11.5M9 3.5 13.5 8 9 12.5" />
    </svg>
  )
}
