import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';

export type SkillAccent = 'amber' | 'neon' | 'iris' | 'lime' | 'bone';

export interface SkillBarProps {
  label: string;
  value: number;
  accent?: SkillAccent;
  index?: number;
  className?: string;
}

const ACCENT_FILL: Record<SkillAccent, string> = {
  amber: 'bg-amber',
  neon: 'bg-neon',
  iris: 'bg-iris',
  lime: 'bg-lime',
  bone: 'bg-bone-100',
};

const ACCENT_TEXT: Record<SkillAccent, string> = {
  amber: 'text-amber-soft',
  neon: 'text-neon-soft',
  iris: 'text-iris-soft',
  lime: 'text-lime',
  bone: 'text-bone-100',
};

export function SkillBar({
  label,
  value,
  accent = 'amber',
  index = 0,
  className,
}: SkillBarProps) {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));
  const delay = reduce ? 0 : 0.08 + index * 0.08;

  return (
    <motion.div
      className={cn('w-full', className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-bone-100">{label}</span>
        <span
          className={cn(
            'font-mono text-xs tabular-nums tracking-[0.08em]',
            ACCENT_TEXT[accent],
          )}
        >
          {clamped.toFixed(0).padStart(2, '0')}
          <span className="text-bone-300 ml-0.5">%</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative w-full h-[3px] overflow-hidden rounded-full bg-ink-700"
      >
        <motion.div
          className={cn('h-full rounded-full', ACCENT_FILL[accent])}
          initial={{ width: reduce ? `${clamped}%` : 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{
            duration: reduce ? 0 : 1,
            delay: delay + 0.05,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
