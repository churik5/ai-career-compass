import {
  forwardRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../lib/cn';

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'prefix' | 'size'
>;

export interface InputProps extends NativeInputProps {
  value: string | number;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  id?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value,
    onChange,
    placeholder,
    prefix,
    suffix,
    id,
    className,
    inputMode = 'numeric',
    autoFocus,
    ...rest
  },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group relative flex items-baseline gap-3 w-full',
        'bg-ink-850 border border-ink-600 rounded-2xl',
        'px-5 py-4 sm:px-6 sm:py-5',
        'transition-colors duration-200',
        'hover:border-ink-600/80',
        'focus-within:border-amber/60',
        className,
      )}
    >
      {prefix ? (
        <span
          aria-hidden="true"
          className="font-mono text-xl sm:text-2xl text-bone-300 select-none"
        >
          {prefix}
        </span>
      ) : null}
      <span className="relative flex-1 min-w-0">
        <input
          ref={ref}
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value, event)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoFocus={autoFocus}
          className={cn(
            'w-full bg-transparent outline-none border-0',
            'font-mono text-3xl sm:text-4xl tabular-nums',
            'text-bone-50 placeholder:text-bone-300/40',
            'tracking-tight',
          )}
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-0 right-0 -bottom-1 h-px',
            'bg-amber origin-left scale-x-0',
            'transition-transform duration-300 ease-out',
            'group-focus-within:scale-x-100',
          )}
        />
      </span>
      {suffix ? (
        <span className="font-mono text-sm uppercase tracking-[0.16em] text-bone-300 select-none">
          {suffix}
        </span>
      ) : null}
    </label>
  );
});
