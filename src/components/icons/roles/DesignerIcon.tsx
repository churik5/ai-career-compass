/**
 * AI Designer — eyedropper hovering over a row of color swatches.
 * The dropper angles from top-right; three swatch squares sit in a palette
 * strip at the base, one slightly offset to break the grid.
 */
type Props = { size?: number; className?: string };

export default function DesignerIcon({ size = 24, className }: Props) {
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
      {/* Eyedropper bulb */}
      <path
        d="M18 3 L21 6 L17 10 L14 7 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Eyedropper shaft */}
      <path d="M15 8 L8 15 L6 17 L7 18 L9 16 L16 9" />
      {/* Droplet */}
      <path d="M5 19 L5.5 20.5 L4.5 20.5 Z" fill="currentColor" stroke="none" />
      {/* Palette strip — three swatches, middle one raised */}
      <rect x={9} y={19} width={3.5} height={3} rx={0.4} fill="currentColor" fillOpacity={0.18} />
      <rect x={13} y={17.5} width={3.5} height={4.5} rx={0.4} />
      <rect x={17} y={19} width={3.5} height={3} rx={0.4} fill="currentColor" fillOpacity={0.18} />
    </svg>
  );
}
