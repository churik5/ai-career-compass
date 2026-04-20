import { cn } from '../lib/cn';

export interface GrainOverlayProps {
  className?: string;
}

export function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grain pointer-events-none fixed inset-0 -z-[5]',
        className,
      )}
    />
  );
}
