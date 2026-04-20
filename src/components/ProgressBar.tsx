import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';

export type ProgressAccent = 'amber' | 'neon' | 'iris' | 'lime';

export interface ProgressBarProps {
  value: number;
  accent?: ProgressAccent;
  label?: string;
  showValue?: boolean;
  height?: number;
  className?: string;
  ariaLabel?: string;
}

const ACCENT_FILL: Record<ProgressAccent, string> = {
  amber: 'bg-amber',
  neon: 'bg-neon',
  iris: 'bg-iris',
  lime: 'bg-lime',
};

const ACCENT_SHIMMER: Record<ProgressAccent, string> = {
  amber: 'from-transparent via-amber-soft/70 to-transparent',
  neon: 'from-transparent via-neon-soft/70 to-transparent',
  iris: 'from-transparent via-iris-soft/70 to-transparent',
  lime: 'from-transparent via-lime/70 to-transparent',
};

export function ProgressBar({
  value,
  accent = 'amber',
  label,
  showValue = false,
  height = 2,
  className,
  ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const reduce = useReducedMotion();

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-baseline justify-between mb-2">
          {label ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="font-mono text-[10px] tracking-[0.14em] text-bone-200 tabular-nums">
              {clamped.toFixed(0).padStart(2, '0')}%
            </span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={ariaLabel ?? label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative w-full overflow-hidden rounded-full bg-ink-700/80"
        style={{ height }}
      >
        <motion.div
          className={cn(
            'relative h-full rounded-full overflow-hidden',
            ACCENT_FILL[accent],
          )}
          initial={{ width: reduce ? `${clamped}%` : 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{
            duration: reduce ? 0 : 0.9,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          {!reduce && clamped > 0 ? (
            <div
              className={cn(
                'absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r',
                ACCENT_SHIMMER[accent],
              )}
              aria-hidden="true"
            />
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
