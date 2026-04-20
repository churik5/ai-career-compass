import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export type BadgeVariant =
  | 'default'
  | 'amber'
  | 'neon'
  | 'iris'
  | 'lime'
  | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-bone-100/10 text-bone-100 border border-bone-100/20',
  amber: 'bg-amber/15 text-amber-soft border border-amber/40',
  neon: 'bg-neon/10 text-neon-soft border border-neon/40',
  iris: 'bg-iris/15 text-iris-soft border border-iris/40',
  lime: 'bg-lime/15 text-lime border border-lime/40',
  outline: 'bg-transparent text-bone-300 border border-bone-300/30',
};

export function Badge({
  variant = 'default',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full',
        'px-2.5 py-1',
        'font-mono text-[10px] uppercase tracking-[0.18em]',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
