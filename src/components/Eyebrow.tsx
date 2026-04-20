import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  marker?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function Eyebrow({
  marker,
  className,
  children,
  ...rest
}: EyebrowProps) {
  const defaultMarker = (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5">
      <span className="text-amber font-mono text-[10px] leading-none">
        {'\u003C'}
      </span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber animate-pulse-soft" />
    </span>
  );

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        'font-mono text-xs tracking-[0.2em] uppercase',
        'text-bone-300',
        className,
      )}
      {...rest}
    >
      {marker ?? defaultMarker}
      <span>{children}</span>
    </span>
  );
}
