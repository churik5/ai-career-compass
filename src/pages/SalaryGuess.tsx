import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Input } from '../components/Input';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { ROLES_BY_ID } from '../data/roles';
import type { GuessDelta } from '../lib/scoring';
import { useQuizState } from '../lib/quizState';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';

type Phase = 'idle' | 'revealed';

function formatMoney(n: number, lang: 'en' | 'ru'): string {
  // Locale formats numbers; we always prefix $ (no conversion).
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  return Math.round(n).toLocaleString(locale);
}

function parseDigits(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return 0;
  const n = Number.parseInt(digits, 10);
  return Number.isFinite(n) ? n : 0;
}

function statusColor(status: GuessDelta['status']): string {
  switch (status) {
    case 'inside':
    case 'close':
      return 'text-amber-soft';
    case 'undershot':
      return 'text-neon-soft';
    case 'overshot':
      return 'text-iris-soft';
  }
}

export default function SalaryGuess() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const pick = useLocale();
  const { state, setGuess } = useQuizState();
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [raw, setRaw] = useState('');
  const confettiFired = useRef(false);
  const guessValue = parseDigits(raw);

  const topRole = state.topRoleId ? ROLES_BY_ID[state.topRoleId] : undefined;

  // Compute the current range for the bar display — used even on idle.
  const [min, max] = useMemo(() => {
    if (!topRole) return [0, 0] as const;
    return [topRole.monthlyIncome.min, topRole.monthlyIncome.max] as const;
  }, [topRole]);

  const committedGuess = state.guess;
  const delta = state.guessDelta;

  // Confetti for inside/close — fire once per reveal.
  useEffect(() => {
    if (phase !== 'revealed' || !delta) return;
    if (confettiFired.current) return;
    if (reduce) return;
    if (delta.status === 'inside' || delta.status === 'close') {
      confettiFired.current = true;
      const duration = 700;
      const end = Date.now() + duration;
      const colors = ['#ff6b35', '#7c6cff', '#ff8a5c', '#a99bff'];
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.75 },
          colors,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.75 },
          colors,
          disableForReducedMotion: true,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [phase, delta, reduce]);

  const handleSubmit = useCallback(() => {
    if (!guessValue || !topRole) return;
    setGuess(guessValue);
    confettiFired.current = false;
    setPhase('revealed');
  }, [guessValue, setGuess, topRole]);

  const handleAgain = useCallback(() => {
    confettiFired.current = false;
    setPhase('idle');
    setRaw('');
  }, []);

  if (!topRole) {
    return <Navigate to="/quiz" replace />;
  }

  // Placement for the guess dot on the mini range scale: clamp display into [0, 1].
  const scaleGuess = committedGuess ?? guessValue;
  // Use a slightly padded window so a big over/under-shot still sits near the edge visually.
  const windowMin = Math.max(0, min - (max - min) * 0.5);
  const windowMax = max + (max - min) * 0.5;
  const windowSpan = windowMax - windowMin;
  const dotPct = windowSpan > 0 ? Math.max(0, Math.min(1, (scaleGuess - windowMin) / windowSpan)) : 0;
  const minPct = windowSpan > 0 ? (min - windowMin) / windowSpan : 0.33;
  const maxPct = windowSpan > 0 ? (max - windowMin) / windowSpan : 0.66;

  const reaction = delta
    ? delta.status === 'inside'
      ? t('salaryGuess.reactionInside')
      : delta.status === 'close'
        ? t('salaryGuess.reactionClose')
        : delta.status === 'undershot'
          ? t('salaryGuess.reactionUndershot')
          : t('salaryGuess.reactionOvershot')
    : '';

  return (
    <PageShell>
      <div className="relative mx-auto w-full max-w-3xl">
        <Orb size={440} color="amber" className="left-[-120px] top-[-80px]" pulse={false} />
        <Orb size={300} color="iris" className="right-[-80px] top-[10%]" />

        <div className="relative pt-6 sm:pt-10">
          <Eyebrow>{t('salaryGuess.eyebrow')}</Eyebrow>

          <AnimatePresence mode="wait" initial={false}>
            {phase === 'idle' ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                transition={{ duration: reduce ? 0 : 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-6 flex flex-col gap-8"
              >
                <h1 className="font-display text-display-md sm:text-display-lg text-bone-50 text-balance leading-[1.05]">
                  {(() => {
                    // Split the template around `{role}` so we can style the role name separately.
                    const template = t('salaryGuess.prompt', { role: '\u0001' });
                    const [before, after = ''] = template.split('\u0001');
                    return (
                      <>
                        {before}
                        <span className="italic text-amber font-normal">
                          {pick(topRole.name)}
                        </span>
                        {after}
                      </>
                    );
                  })()}
                </h1>
                <p className="text-bone-200 text-lg max-w-xl leading-relaxed">
                  {t('salaryGuess.caption')}
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="flex flex-col gap-6"
                >
                  <Input
                    id="salary-guess"
                    value={raw}
                    onChange={(v) => {
                      // strip non-digits, format with commas for display.
                      const clean = v.replace(/[^\d]/g, '');
                      setRaw(clean);
                    }}
                    placeholder={t('salaryGuess.placeholder')}
                    prefix={t('salaryGuess.currencyPrefix')}
                    suffix={t('salaryGuess.perMonth')}
                    inputMode="numeric"
                    autoFocus
                  />
                  <div>
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={guessValue <= 0}
                      iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
                    >
                      {t('salaryGuess.submit')}
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-6 flex flex-col gap-8"
              >
                {/* Reaction line */}
                <div>
                  <h1
                    className={cn(
                      'font-display text-display-md sm:text-display-lg text-balance leading-[1.05]',
                      delta ? statusColor(delta.status) : 'text-bone-50',
                    )}
                  >
                    {reaction}
                  </h1>
                  {delta && delta.status !== 'inside' ? (
                    <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-bone-300">
                      {delta.status === 'close'
                        ? t('salaryGuess.perfect')
                        : t('salaryGuess.off', { percent: delta.offByPercent })}
                    </p>
                  ) : null}
                </div>

                {/* Tableau: your guess vs actual range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="glass lumen rounded-2xl p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300">
                      {t('salaryGuess.yourGuess')}
                    </span>
                    <div className="mt-3 font-mono text-4xl sm:text-5xl tabular-nums text-bone-50">
                      {t('salaryGuess.currencyPrefix')}
                      {formatMoney(committedGuess ?? 0, lang)}
                    </div>
                  </div>
                  <div className="glass lumen rounded-2xl p-6 border-amber/30 border">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-soft">
                      {t('salaryGuess.actualRange')}
                    </span>
                    <div className="mt-3 font-mono text-4xl sm:text-5xl tabular-nums text-bone-50">
                      {t('salaryGuess.currencyPrefix')}
                      {formatMoney(min, lang)}
                      <span className="text-bone-300 mx-2">–</span>
                      {t('salaryGuess.currencyPrefix')}
                      {formatMoney(max, lang)}
                    </div>
                  </div>
                </div>

                {/* Range bar visualisation */}
                <div className="relative mt-2 pt-10 pb-6">
                  {/* axis line */}
                  <div className="relative h-[6px] rounded-full bg-ink-700 overflow-hidden">
                    {/* actual range bracket */}
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleX: reduce ? 1 : 0.2, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: reduce ? 0 : 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-y-0 rounded-full bg-amber/70 origin-left"
                      style={{
                        left: `${minPct * 100}%`,
                        width: `${(maxPct - minPct) * 100}%`,
                      }}
                    />
                  </div>

                  {/* range tick labels */}
                  <span
                    className="absolute top-0 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300"
                    style={{ left: `${minPct * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    {t('salaryGuess.currencyPrefix')}
                    {formatMoney(min, lang)}
                  </span>
                  <span
                    className="absolute top-0 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300"
                    style={{ left: `${maxPct * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    {t('salaryGuess.currencyPrefix')}
                    {formatMoney(max, lang)}
                  </span>

                  {/* User guess dot */}
                  <motion.span
                    aria-label={t('salaryGuess.yourGuess')}
                    initial={{ opacity: 0, y: reduce ? 0 : -8, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: reduce ? 0 : 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute"
                    style={{
                      left: `${dotPct * 100}%`,
                      top: 'calc(50% - 2px)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span className="block w-4 h-4 rounded-full bg-amber shadow-glow" />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-soft tabular-nums whitespace-nowrap"
                    >
                      {t('salaryGuess.currencyPrefix')}
                      {formatMoney(committedGuess ?? 0, lang)}
                    </span>
                  </motion.span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
                  >
                    {t('salaryGuess.continue')}
                  </Button>
                  <Button variant="ghost" size="md" onClick={handleAgain}>
                    {t('salaryGuess.again')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
