/**
 * AI Avatar Specialist — faceted 3D head silhouette.
 * A polygonal/wireframe head with crystalline facets suggesting a synthetic
 * digital human. The dot on the cheek reads as a tracking marker.
 */
type Props = { size?: number; className?: string };

export default function AvatarIcon({ size = 24, className }: Props) {
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
      {/* Head outline — slightly faceted (teardrop/polygon) */}
      <path
        d="M12 3 L16.5 5 L18 9.5 L17 15 L14 19 L10 20 L6.5 17 L5.5 12 L7 7 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Interior facet lines — wireframe edges */}
      <path d="M12 3 L12 14" />
      <path d="M7 7 L12 10 L17 9.5" />
      <path d="M5.5 12 L12 14 L17 15" />
      <path d="M12 14 L10 20" />
      <path d="M12 14 L14 19" />
      {/* Tracking marker dot */}
      <circle cx={15.5} cy={12} r={0.6} fill="currentColor" stroke="none" />
    </svg>
  );
}
