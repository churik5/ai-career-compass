import * as Icons from 'lucide-react';
import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface IconProps extends Omit<ComponentProps<LucideIcon>, 'ref'> {
  name: string;
}

/**
 * Renders a lucide-react icon by its string name.
 * Falls back to `Sparkles` if the name cannot be resolved, so typos in data
 * never crash a page.
 */
export function Icon({ name, ...rest }: IconProps) {
  const lookup = Icons as unknown as Record<string, LucideIcon | undefined>;
  const Resolved = lookup[name] ?? lookup.Sparkles;
  if (!Resolved) return null;
  return <Resolved {...rest} />;
}
