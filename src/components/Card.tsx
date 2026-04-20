import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export type CardVariant = 'glass' | 'glass-strong' | 'solid';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  glass: 'glass lumen',
  'glass-strong': 'glass-strong lumen',
  solid: 'bg-ink-850 border border-ink-600 lumen',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-12',
};

export function Card({
  variant = 'glass',
  padding = 'md',
  as,
  className,
  children,
  ...rest
}: CardProps) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'relative rounded-3xl overflow-hidden',
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export function CardHeader({ className, children, ...rest }: CardSectionProps) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4 mb-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...rest }: CardSectionProps) {
  return (
    <h3
      className={cn(
        'font-display text-2xl sm:text-3xl text-bone-50 tracking-tight',
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function CardBody({ className, children, ...rest }: CardSectionProps) {
  return (
    <div className={cn('text-bone-200', className)} {...rest}>
      {children}
    </div>
  );
}
