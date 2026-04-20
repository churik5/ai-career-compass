/**
 * AI Website Specialist — browser window chrome with a cursor arrow and a
 * small code/waveform line inside. Traffic-light dots at top-left anchor it
 * as a browser, not a card.
 */
type Props = { size?: number; className?: string };

export default function WebsiteIcon({ size = 24, className }: Props) {
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
      {/* Browser window */}
      <rect
        x={2.5}
        y={4}
        width={19}
        height={16}
        rx={2}
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Chrome bar */}
      <path d="M2.5 8 L21.5 8" />
      {/* Traffic light dots */}
      <circle cx={5} cy={6} r={0.6} fill="currentColor" stroke="none" />
      <circle cx={7} cy={6} r={0.6} fill="currentColor" stroke="none" />
      <circle cx={9} cy={6} r={0.6} fill="currentColor" stroke="none" />
      {/* Code line 1 — angle brackets */}
      <path d="M7 12 L5.5 13.5 L7 15" />
      <path d="M11 11.5 L9.5 16" />
      <path d="M13 12 L14.5 13.5 L13 15" />
      {/* Cursor arrow — bottom right */}
      <path d="M15 16 L19 18 L17 18.5 L18 20.5 L16.5 21 L15.5 19 L14 19.5 Z" fill="currentColor" fillOpacity={0.4} />
    </svg>
  );
}
