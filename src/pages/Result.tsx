import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { Stagger } from '../components/Stagger';
import { Icon } from '../lib/icon';
import { useQuizState } from '../lib/quizState';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';
import type { AccentName } from '../data/roles';

const ACCENT_TEXT: Record<AccentName, string> = {
  amber: 'text-amber-soft',
  iris: 'text-iris-soft',
  neon: 'text-neon-soft',
  lime: 'text-lime',
};

const ACCENT_GLOW: Record<AccentName, string> = {
  amber: 'shadow-[0_0_80px_-10px_rgba(255,107,53,0.45)]',
  iris: 'shadow-[0_0_80px_-10px_rgba(124,108,255,0.45)]',
  neon: 'shadow-[0_0_80px_-10px_rgba(34,211,238,0.4)]',
  lime: 'shadow-[0_0_80px_-10px_rgba(196,240,97,0.35)]',
};

const ACCENT_ORB: Record<AccentName, 'amber' | 'iris' | 'neon' | 'lime'> = {
  amber: 'amber',
  iris: 'iris',
  neon: 'neon',
  lime: 'lime',
};

const ACCENT_PILL: Record<AccentName, string> = {
  amber: 'bg-amber/15 text-amber-soft border-amber/40',
  iris: 'bg-iris/15 text-iris-soft border-iris/40',
  neon: 'bg-neon/10 text-neon-soft border-neon/40',
  lime: 'bg-lime/15 text-lime border-lime/40',
};

export default function Result() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const pick = useLocale();
  const { state, reset } = useQuizState();
  const reduce = useReducedMotion();

  if (!state.results || state.results.length === 0) {
    return <Navigate to="/quiz" replace />;
  }

  const top = state.results[0]!;
  const runnersUp = state.results.slice(1, 3);

  const handleRetake = () => {
    reset();
    navigate('/');
  };

  return (
    <PageShell>
      <div className="relative mx-auto w-full max-w-4xl">
        <Orb
          size={520}
          color={ACCENT_ORB[top.role.accent]}
          className="left-1/2 top-[-120px] -translate-x-1/2"
          pulse={false}
        />

        <div className="relative">
          <Stagger className="flex flex-col items-start gap-6 pt-6 sm:pt-10" stagger={0.1}>
            <Eyebrow>{t('result.eyebrow')}</Eyebrow>

            {/* Icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                'grid place-items-center',
                'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
                'glass-strong lumen',
                ACCENT_TEXT[top.role.accent],
                ACCENT_GLOW[top.role.accent],
              )}
              aria-hidden="true"
            >
              <Icon name={top.role.iconName} size={44} strokeWidth={1.4} />
            </motion.div>

            {/* Role name */}
            <h1 className="font-display text-display-lg text-bone-50 text-balance tracking-tight leading-[0.98]">
              {pick(top.role.name)}
            </h1>

            {/* Slogan */}
            <p className="font-display italic text-2xl sm:text-3xl text-bone-200 text-balance max-w-2xl">
              {pick(top.role.slogan)}
            </p>

            {/* Match pill */}
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5',
                'font-mono text-xs uppercase tracking-[0.2em] tabular-nums',
                ACCENT_PILL[top.role.accent],
              )}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse-soft" />
              {t('result.matchPill', { percent: top.percent })}
            </span>

            {/* Description */}
            <p className="max-w-2xl text-lg text-bone-200 leading-relaxed text-balance">
              {pick(top.role.description)}
            </p>
          </Stagger>
        </div>

        {/* Runners-up */}
        {runnersUp.length > 0 ? (
          <section className="relative mt-16 sm:mt-20">
            <Eyebrow>{t('result.alsoExplore')}</Eyebrow>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {runnersUp.map((r) => (
                <motion.div
                  key={r.roleId}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={cn(
                    'glass lumen rounded-2xl p-5 sm:p-6',
                    'flex items-center gap-5',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid place-items-center w-12 h-12 rounded-2xl shrink-0',
                      'bg-ink-800/80 border border-ink-600',
                      ACCENT_TEXT[r.role.accent],
                    )}
                  >
                    <Icon name={r.role.iconName} size={22} strokeWidth={1.5} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-display text-lg sm:text-xl text-bone-50 truncate">
                      {pick(r.role.name)}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300 mt-0.5">
                      {t('result.rankLabel', { rank: r.rank })}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'font-mono text-sm tabular-nums tracking-[0.1em] shrink-0',
                      ACCENT_TEXT[r.role.accent],
                    )}
                  >
                    {r.percent}%
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        ) : null}

        {/* CTA row */}
        <div className="relative mt-14 sm:mt-16 flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/salary')}
            iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
          >
            {t('result.continue')}
          </Button>
          <Button variant="ghost" size="md" onClick={handleRetake}>
            {t('result.retake')}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
