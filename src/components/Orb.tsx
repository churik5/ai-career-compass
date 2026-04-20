import { type CSSProperties } from 'react';
import { cn } from '../lib/cn';

export type OrbColor = 'amber' | 'neon' | 'iris' | 'lime' | 'bone';

export interface OrbProps {
  size?: number | string;
  color?: OrbColor;
  className?: string;
  pulse?: boolean;
  style?: CSSProperties;
}

const COLOR_STOPS: Record<OrbColor, { core: string; mid: string; edge: string }> = {
  amber: {
    core: 'rgba(255, 138, 92, 0.55)',
    mid: 'rgba(255, 107, 53, 0.28)',
    edge: 'rgba(212, 72, 30, 0)',
  },
  neon: {
    core: 'rgba(103, 232, 249, 0.45)',
    mid: 'rgba(34, 211, 238, 0.22)',
    edge: 'rgba(8, 145, 178, 0)',
  },
  iris: {
    core: 'rgba(169, 155, 255, 0.48)',
    mid: 'rgba(124, 108, 255, 0.22)',
    edge: 'rgba(79, 63, 214, 0)',
  },
  lime: {
    core: 'rgba(196, 240, 97, 0.45)',
    mid: 'rgba(143, 184, 59, 0.22)',
    edge: 'rgba(100, 130, 30, 0)',
  },
  bone: {
    core: 'rgba(247, 245, 239, 0.35)',
    mid: 'rgba(216, 210, 195, 0.16)',
    edge: 'rgba(183, 174, 160, 0)',
  },
};

export function Orb({
  size = 520,
  color = 'amber',
  className,
  pulse = true,
  style,
}: OrbProps) {
  const stops = COLOR_STOPS[color];
  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl',
        pulse && 'animate-pulse-soft',
        className,
      )}
      style={{
        width: dim,
        height: dim,
        background: `radial-gradient(circle at 50% 50%, ${stops.core} 0%, ${stops.mid} 35%, ${stops.edge} 70%)`,
        ...style,
      }}
    />
  );
}
