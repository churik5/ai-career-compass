import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface KBDProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export function KBD({ className, children, ...rest }: KBDProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[1.5rem] px-1.5 h-5',
        'rounded-md border border-bone-300/25',
        'bg-ink-800/60 text-bone-200',
        'font-mono text-[10px] tracking-wide',
        'shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.3)]',
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
