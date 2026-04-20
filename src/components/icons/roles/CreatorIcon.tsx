/**
 * AI Creator — lightning bolt with scattered spark particles.
 * A bold bolt at the center, with four asymmetric sparks orbiting —
 * energy, output, and the cadence of a creator shipping daily.
 */
type Props = { size?: number; className?: string };

export default function CreatorIcon({ size = 24, className }: Props) {
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
      {/* Lightning bolt */}
      <path
        d="M13 2 L5 13 L11 13 L9 22 L18 10 L12 10 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Sparks — four-pointed stars, deliberately asymmetric */}
      <path d="M3 5 L3 7 M2 6 L4 6" />
      <path d="M20 4 L20 6 M19 5 L21 5" />
      <path d="M21 16 L21 18 M20 17 L22 17" />
      <path d="M4 20 L4 22 M3 21 L5 21" />
    </svg>
  );
}
