import { motion } from 'framer-motion';
import { useI18n, type Lang } from '../lib/i18n';
import { cn } from '../lib/cn';

export interface LanguageSwitcherProps {
  className?: string;
}

const OPTIONS: Lang[] = ['en', 'ru'];

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('language.toggle')}
      className={cn(
        'relative inline-flex items-center',
        'rounded-full bg-ink-800/70 border border-ink-600',
        'p-1',
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={isActive}
            aria-label={t(`language.${option}`)}
            className={cn(
              'relative z-10 inline-flex items-center justify-center',
              'px-3 py-1 min-w-[34px]',
              'font-mono text-[11px] tracking-[0.18em] uppercase',
              'rounded-full transition-colors duration-200',
              isActive
                ? 'text-ink-950'
                : 'text-bone-300 hover:text-bone-100',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="lang-switcher-pill"
                className="absolute inset-0 rounded-full bg-amber"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative">{t(`language.${option}`)}</span>
          </button>
        );
      })}
    </div>
  );
}
