/**
 * AI Music Producer — vertical equalizer bars of varying heights with a
 * music note floating beside them. The bars read as a mixer / spectrum;
 * the note anchors it firmly in music production.
 */
type Props = { size?: number; className?: string };

export default function MusicProducerIcon({ size = 24, className }: Props) {
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
      {/* EQ bars — ascending-then-descending rhythm */}
      <rect x={3} y={13} width={2.5} height={7} rx={0.6} fill="currentColor" fillOpacity={0.18} />
      <rect x={6.5} y={9} width={2.5} height={11} rx={0.6} fill="currentColor" fillOpacity={0.18} />
      <rect x={10} y={5} width={2.5} height={15} rx={0.6} fill="currentColor" fillOpacity={0.18} />
      <rect x={13.5} y={11} width={2.5} height={9} rx={0.6} fill="currentColor" fillOpacity={0.18} />
      {/* Music note — flag and stem */}
      <path d="M21 4 L21 15" />
      <path d="M21 4 Q 17 5, 18 9" />
      {/* Note head */}
      <ellipse cx={19.5} cy={15} rx={1.8} ry={1.3} fill="currentColor" fillOpacity={0.4} />
    </svg>
  );
}
