/**
 * AI Director — clapperboard with a mini storyboard strip beneath.
 * The hinged top clapper sits over the board; three small frames under it
 * stand in for a storyboard / shot list.
 */
type Props = { size?: number; className?: string };

export default function DirectorIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Clapper top (angled) */}
      <path
        d="M3 6 L20 4 L21 8 L4 10 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Stripes on the clapper */}
      <path d="M8 5 L6 9.5" />
      <path d="M13 4.5 L11 9" />
      <path d="M18 4 L16 8.5" />
      {/* Storyboard strip — 3 frames */}
      <rect x={3.5} y={12} width={5} height={4.5} rx={0.5} />
      <rect x={9.5} y={12} width={5} height={4.5} rx={0.5} />
      <rect x={15.5} y={12} width={5} height={4.5} rx={0.5} />
      {/* Base bar */}
      <path d="M3 19 L21 19" />
    </svg>
  );
}
