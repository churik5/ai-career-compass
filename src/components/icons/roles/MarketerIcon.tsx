/**
 * AI Marketer — concentric target with an arrow struck into the bullseye
 * and a rising curve behind it. The curve tells the growth story; the
 * arrow tells the hit-rate story.
 */
type Props = { size?: number; className?: string };

export default function MarketerIcon({ size = 24, className }: Props) {
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
      {/* Rising curve — behind target */}
      <path d="M2 20 Q 8 18, 11 14 T 21 5" opacity={0.6} />
      <path d="M18 5 L21 5 L21 8" opacity={0.6} />
      {/* Target outer ring */}
      <circle cx={11} cy={14} r={6} fill="currentColor" fillOpacity={0.14} />
      {/* Target middle ring */}
      <circle cx={11} cy={14} r={3.5} />
      {/* Bullseye */}
      <circle cx={11} cy={14} r={1.2} fill="currentColor" stroke="none" />
      {/* Arrow — diagonal, sticking in */}
      <path d="M18 7 L12 13" />
      <path d="M15.5 6.5 L18 7 L17.5 9.5" />
    </svg>
  );
}
