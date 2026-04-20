/**
 * AI Copywriter — pen nib with flowing text lines and a blinking text caret.
 * The nib drops onto a page; text lines fan beneath it with a cursor bar,
 * suggesting live AI-assisted writing.
 */
type Props = { size?: number; className?: string };

export default function CopywriterIcon({ size = 24, className }: Props) {
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
      {/* Nib body */}
      <path
        d="M14 3 L20 9 L12 17 L6 17 L6 11 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Nib slit */}
      <path d="M9 8 L15 14" />
      {/* Nib hole */}
      <circle cx={11.5} cy={10.5} r={0.9} />
      {/* Flowing text lines */}
      <path d="M4 20 L13 20" />
      <path d="M8 22 L18 22" />
      {/* Text caret */}
      <path d="M20 19 L20 23" />
    </svg>
  );
}
