/**
 * AI Marketplace Manager — price tag angled upward with a trending arrow line
 * emerging from it. The tag reads as a product card; the trend line reads as
 * conversion rising through attentive listing work.
 */
type Props = { size?: number; className?: string };

export default function MarketplaceIcon({ size = 24, className }: Props) {
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
      {/* Price tag body (angled) */}
      <path
        d="M3 12 L12 3 L21 3 L21 12 L12 21 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Tag hole */}
      <circle cx={17} cy={7} r={1.2} />
      {/* Trend arrow line breaking out of the tag — bottom-left to top-right */}
      <path d="M5 18 L9 14 L12 16 L16 12" />
      <path d="M13 12 L16 12 L16 15" />
    </svg>
  );
}
