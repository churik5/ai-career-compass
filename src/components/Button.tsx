import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'neon' | 'iris';
export type ButtonSize = 'sm' | 'md' | 'lg';

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children'>;

export interface ButtonProps extends MotionButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  uppercase?: boolean;
  className?: string;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-amber text-ink-950 border border-amber/0',
    'hover:bg-amber-soft hover:shadow-glow',
    'disabled:bg-ink-700 disabled:text-bone-300',
  ),
  secondary: cn(
    'bg-transparent text-bone-100 border border-bone-100/40',
    'hover:bg-bone-100 hover:text-ink-950 hover:border-bone-100',
    'disabled:text-bone-300 disabled:border-ink-600',
  ),
  ghost: cn(
    'bg-transparent text-bone-300 border border-transparent',
    'hover:text-bone-50 hover:border-bone-300/30',
    'disabled:text-ink-600',
  ),
  neon: cn(
    'bg-neon/10 text-neon border border-neon/50',
    'hover:bg-neon hover:text-ink-950 hover:border-neon hover:shadow-glow-cyan',
    'disabled:bg-ink-700 disabled:text-bone-300 disabled:border-ink-600',
  ),
  iris: cn(
    'bg-iris/10 text-iris-soft border border-iris/50',
    'hover:bg-iris hover:text-bone-50 hover:border-iris',
    'disabled:bg-ink-700 disabled:text-bone-300 disabled:border-ink-600',
  ),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    uppercase = false,
    className,
    children,
    type = 'button',
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'group relative inline-flex items-center justify-center',
        'rounded-full font-medium',
        'transition-colors duration-200',
        'disabled:cursor-not-allowed',
        uppercase && 'uppercase tracking-[0.12em] text-[0.8em] font-mono',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
      {children ? <span className="inline-flex items-center">{children}</span> : null}
      {iconRight ? (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {iconRight}
        </span>
      ) : null}
    </motion.button>
  );
});
