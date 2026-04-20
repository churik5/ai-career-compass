/**
 * AI Content Manager — 3x3 grid of posts with the middle cell highlighted.
 * Reads as a social grid / content calendar; the filled middle cell marks
 * the featured / today's post.
 */
type Props = { size?: number; className?: string };

export default function ContentManagerIcon({ size = 24, className }: Props) {
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
      {/* Outer frame */}
      <rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={2}
        fill="currentColor"
        fillOpacity={0.08}
      />
      {/* 9 cells — middle one filled darker */}
      <rect x={5} y={5} width={4} height={4} rx={0.6} />
      <rect x={10} y={5} width={4} height={4} rx={0.6} />
      <rect x={15} y={5} width={4} height={4} rx={0.6} />
      <rect x={5} y={10} width={4} height={4} rx={0.6} />
      <rect
        x={10}
        y={10}
        width={4}
        height={4}
        rx={0.6}
        fill="currentColor"
        fillOpacity={0.4}
      />
      <rect x={15} y={10} width={4} height={4} rx={0.6} />
      <rect x={5} y={15} width={4} height={4} rx={0.6} />
      <rect x={10} y={15} width={4} height={4} rx={0.6} />
      <rect x={15} y={15} width={4} height={4} rx={0.6} />
    </svg>
  );
}
