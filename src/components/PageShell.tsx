import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { cn } from '../lib/cn';
import { NeuralBackground } from './NeuralBackground';
import { GrainOverlay } from './GrainOverlay';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface PageShellProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideNav?: boolean;
  contentClassName?: string;
}

function BrandGlyph() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="14"
        cy="14"
        r="12.5"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle
        cx="14"
        cy="14"
        r="7.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <path
        d="M14 3.5 L16.2 14 L14 24.5 L11.8 14 Z"
        fill="#ff6b35"
      />
      <path
        d="M3.5 14 L14 11.8 L24.5 14 L14 16.2 Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
      <circle cx="14" cy="14" r="1.3" fill="#ff6b35" />
    </svg>
  );
}

export function PageShell({
  children,
  hideFooter = false,
  hideNav = false,
  contentClassName,
}: PageShellProps) {
  const { t } = useI18n();

  return (
    <div className="relative isolate min-h-screen flex flex-col overflow-x-hidden">
      <NeuralBackground />
      <GrainOverlay />

      {!hideNav && (
        <header
          className={cn(
            'relative z-20 w-full',
            'px-5 sm:px-8 lg:px-12',
            'pt-5 sm:pt-6',
          )}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
            <Link
              to="/"
              aria-label={t('nav.home')}
              className={cn(
                'group inline-flex items-center gap-2.5',
                'text-bone-100 hover:text-bone-50 transition-colors',
                'focus:outline-none',
              )}
            >
              <BrandGlyph />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] tracking-tight">
                  {t('nav.brand')}
                </span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.24em] text-bone-300">
                  {'\u2014'} 2026 {'/'} EDITION 01
                </span>
              </span>
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
      )}

      <main
        className={cn(
          'relative z-10 flex-1',
          'px-5 sm:px-8 lg:px-12',
          'py-8 sm:py-12',
          contentClassName,
        )}
      >
        {children}
      </main>

      {!hideFooter && (
        <footer
          className={cn(
            'relative z-10 w-full mt-12',
            'px-5 sm:px-8 lg:px-12',
            'pb-8 sm:pb-10',
          )}
        >
          <div
            className={cn(
              'mx-auto w-full max-w-7xl',
              'flex flex-col sm:flex-row sm:items-end sm:justify-between',
              'gap-3 pt-6',
              'border-t border-ink-600/60',
            )}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                {t('meta.tagline')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-bone-300/70">
                {t('footer.madeWith')}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/80">
              {t('footer.copyright')}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
