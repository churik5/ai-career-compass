/**
 * AI Video Maker — film strip with sprocket holes and a play triangle
 * sitting in the center frame. The strip is horizontal; sprocket squares
 * top and bottom give it authentic film grammar.
 */
type Props = { size?: number; className?: string };

export default function VideoMakerIcon({ size = 24, className }: Props) {
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
      {/* Film strip body */}
      <rect
        x={3}
        y={5}
        width={18}
        height={14}
        rx={2}
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Top sprockets */}
      <rect x={5} y={6.5} width={1.5} height={1.5} rx={0.2} />
      <rect x={11.25} y={6.5} width={1.5} height={1.5} rx={0.2} />
      <rect x={17.5} y={6.5} width={1.5} height={1.5} rx={0.2} />
      {/* Bottom sprockets */}
      <rect x={5} y={16} width={1.5} height={1.5} rx={0.2} />
      <rect x={11.25} y={16} width={1.5} height={1.5} rx={0.2} />
      <rect x={17.5} y={16} width={1.5} height={1.5} rx={0.2} />
      {/* Inner frame lines */}
      <path d="M8.5 9.5 L8.5 14.5" />
      <path d="M15.5 9.5 L15.5 14.5" />
      {/* Play triangle in center */}
      <path d="M11 10.5 L14 12 L11 13.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
