/**
 * AI Animator — wavy motion path with a leading dot and a fading trail.
 * A sine-like stroke sweeps across; a solid dot rides the front, with two
 * smaller trailing dots to suggest easing and a breath of motion blur.
 */
type Props = { size?: number; className?: string };

export default function AnimatorIcon({ size = 24, className }: Props) {
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
      {/* Motion path — two cubic waves */}
      <path d="M3 14 C 5 8, 8 8, 10 14 S 15 20, 17 14" />
      {/* Echo wave — softer, below */}
      <path
        d="M3 18 C 5 14, 8 14, 10 18 S 15 22, 17 18"
        opacity={0.55}
      />
      {/* Trailing dots — size tapers */}
      <circle cx={6} cy={11} r={0.6} fill="currentColor" stroke="none" opacity={0.5} />
      <circle cx={10} cy={14} r={0.9} fill="currentColor" stroke="none" opacity={0.75} />
      {/* Leading dot — solid, with glow ring */}
      <circle cx={17} cy={14} r={2} fill="currentColor" fillOpacity={0.18} />
      <circle cx={17} cy={14} r={1.3} fill="currentColor" stroke="none" />
    </svg>
  );
}
