import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { SkillBar } from '../components/SkillBar';
import { Stagger } from '../components/Stagger';
import { Icon } from '../lib/icon';
import { ROLES_BY_ID, type AccentName, type SkillName } from '../data/roles';
import { AI_CONTENT_MANAGER_COURSE } from '../data/course';
import { getPersonalization } from '../data/personalization';
import { GOAL_QUESTION, CONTEXT_QUESTION } from '../data/questions';
import { useQuizState } from '../lib/quizState';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';

const TARGET_ROLE_ID = 'ai-content-manager';

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

const ACCENT_SKILL: Record<AccentName, 'amber' | 'iris' | 'neon' | 'lime'> = {
  amber: 'amber',
  iris: 'iris',
  neon: 'neon',
  lime: 'lime',
};

const ACCENT_BADGE: Record<AccentName, 'amber' | 'iris' | 'neon' | 'lime'> = {
  amber: 'amber',
  iris: 'iris',
  neon: 'neon',
  lime: 'lime',
};

function formatUSD(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export default function Result() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const pick = useLocale();
  const { state, reset } = useQuizState();
  const reduce = useReducedMotion();

  // Always pull the AI Content Manager — funnel always lands here.
  const role = ROLES_BY_ID[TARGET_ROLE_ID]!;
  const course = AI_CONTENT_MANAGER_COURSE;
  const personalization = getPersonalization(state.goal, state.context);

  const goalLabel = useMemo(() => {
    if (!state.goal) return null;
    const opt = GOAL_QUESTION.options.find((o) => o.id === state.goal);
    return opt ? pick(opt.label) : null;
  }, [state.goal, pick]);

  const contextLabel = useMemo(() => {
    if (!state.context) return null;
    const opt = CONTEXT_QUESTION.options.find((o) => o.id === state.context);
    return opt ? pick(opt.label) : null;
  }, [state.context, pick]);

  const topSkills = role.skills.slice(0, 4);
  const savings = course.priceOriginal - course.priceCurrent;

  const handleRetake = () => {
    reset();
    navigate('/');
  };

  const handleEnroll = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '#enroll';
    }
  };

  return (
    <PageShell>
      <div className="relative mx-auto w-full max-w-5xl">
        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section className="relative">
          <Orb
            size={520}
            color={ACCENT_ORB[role.accent]}
            className="left-1/2 top-[-160px] -translate-x-1/2"
            pulse={false}
          />
          <Orb
            size={320}
            color="amber"
            className="right-[-120px] top-[40%]"
          />

          <div className="relative">
            <Stagger className="flex flex-col items-start gap-6 pt-6 sm:pt-10" stagger={0.08}>
              <Eyebrow>{t('result.eyebrow')}</Eyebrow>

              {/* Icon badge + match pill */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className={cn(
                    'grid place-items-center',
                    'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
                    'bg-ink-900/90 border border-ink-600 lumen',
                    ACCENT_TEXT[role.accent],
                    ACCENT_GLOW[role.accent],
                  )}
                  aria-hidden="true"
                >
                  <role.icon size={44} />
                </motion.div>
                <Badge variant="amber" className="text-[11px] py-1.5 px-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-soft mr-2 animate-pulse-soft" />
                  {t('result.matchPill')}
                </Badge>
              </div>

              {/* Role name */}
              <h1 className="font-display text-display-lg text-bone-50 text-balance tracking-tight leading-[0.98]">
                {pick(role.name)}
              </h1>

              {/* Slogan */}
              <p className="font-display italic text-2xl sm:text-3xl text-bone-200 text-balance max-w-2xl">
                {pick(role.slogan)}
              </p>

              {/* Personalized headline */}
              <h2 className="font-display text-display-md sm:text-display-lg text-bone-50 text-balance leading-[1.02] tracking-tight max-w-3xl">
                {pick(personalization.headline)}
              </h2>

              {/* Personalized intro */}
              <p className="max-w-2xl text-lg text-bone-200 leading-relaxed text-balance">
                {pick(personalization.intro)}
              </p>
            </Stagger>
          </div>
        </section>

        {/* ── 2. YOU CHOSE ────────────────────────────────── */}
        {goalLabel && contextLabel ? (
          <section className="relative mt-12 sm:mt-14">
            <div
              className={cn(
                'inline-flex flex-wrap items-center gap-x-3 gap-y-2',
                'rounded-full border border-ink-600 bg-ink-850/60 lumen',
                'px-4 py-2.5',
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                {t('result.yourAnswers')}
              </span>
              <span aria-hidden="true" className="text-bone-300/40">/</span>
              <span className="text-sm text-bone-100">{goalLabel}</span>
              <span aria-hidden="true" className="text-amber/70">•</span>
              <span className="text-sm text-bone-100">{contextLabel}</span>
            </div>
          </section>
        ) : null}

        {/* ── 3. PROFESSION CARD ──────────────────────────── */}
        <section className="relative mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* What they do */}
          <Card variant="glass" padding="lg" className="lg:col-span-7">
            <Eyebrow>{t('result.whatTheyDoTitle')}</Eyebrow>
            <Stagger className="mt-6 flex flex-col gap-4" stagger={0.07}>
              {pick(role.whatTheyDo).map((line, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.22em] tabular-nums pt-1 shrink-0',
                      ACCENT_TEXT[role.accent],
                    )}
                  >
                    {'→ '}
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-bone-100 leading-relaxed">{line}</p>
                </div>
              ))}
            </Stagger>
          </Card>

          {/* Skills + income */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card
              variant="glass-strong"
              padding="lg"
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.18] pointer-events-none"
                style={{
                  background: `radial-gradient(120% 80% at 90% 10%, ${role.gradient[0]}55, transparent 60%), radial-gradient(100% 80% at 0% 100%, ${role.gradient[1]}33, transparent 60%)`,
                }}
              />
              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300">
                  {t('result.incomeLabel')}
                </span>
                <div className="mt-3 font-display text-4xl sm:text-5xl text-bone-50 tabular-nums tracking-tight leading-none">
                  {t('result.incomeRange', {
                    min: formatUSD(role.monthlyIncome.min),
                    max: formatUSD(role.monthlyIncome.max),
                  })}
                </div>
                <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
                  /mo
                </span>
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <Eyebrow>{t('result.skillsTitle')}</Eyebrow>
              <div className="mt-6 flex flex-col gap-5">
                {topSkills.map((skill, idx) => (
                  <SkillBar
                    key={skill.key}
                    label={t(`skills.${skill.key}` as `skills.${SkillName}`)}
                    value={skill.value}
                    accent={ACCENT_SKILL[role.accent]}
                    index={idx}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── 4. COURSE BLOCK ─────────────────────────────── */}
        <section id="enroll" className="relative mt-20 sm:mt-28 scroll-mt-24">
          <Orb
            size={420}
            color="amber"
            className="left-[-100px] top-[-60px]"
            pulse={false}
          />
          <Orb
            size={300}
            color={ACCENT_ORB[role.accent]}
            className="right-[-80px] bottom-[10%]"
          />

          <div className="relative flex flex-col gap-4 mb-8 sm:mb-10">
            <Eyebrow>{t('result.courseEyebrow')}</Eyebrow>
            <h2 className="font-display text-display-md sm:text-display-lg text-bone-50 text-balance tracking-tight leading-[1.02]">
              {pick(course.title)}
            </h2>
            <p className="text-lg text-bone-200 leading-relaxed text-balance max-w-2xl">
              {pick(course.subtitle)}
            </p>
          </div>

          <Card
            variant="glass-strong"
            padding="none"
            className="relative overflow-hidden rounded-[2rem] bg-ink-900/95"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.16] pointer-events-none"
              style={{
                background: `radial-gradient(110% 80% at 80% 0%, ${role.gradient[0]}55, transparent 55%), radial-gradient(100% 80% at 0% 100%, ${role.gradient[1]}33, transparent 60%)`,
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-7 sm:p-12">
              {/* Price block — visual hero */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-end gap-5 flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300">
                      {t('result.priceWas')}
                    </span>
                    <span className="mt-2 font-mono text-2xl sm:text-3xl text-bone-300/70 line-through tabular-nums leading-none">
                      ${formatUSD(course.priceOriginal)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-soft">
                      {t('result.priceNow')}
                    </span>
                    <span className="mt-2 font-display text-display-lg sm:text-display-xl text-amber tabular-nums leading-none tracking-tight">
                      ${formatUSD(course.priceCurrent)}
                    </span>
                  </div>
                  <Badge
                    variant="amber"
                    className="text-[11px] py-1.5 px-3 mb-2 self-end"
                  >
                    <Sparkles size={11} strokeWidth={2} className="mr-1.5" />
                    {t('result.save', { amount: formatUSD(savings) })}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-ink-600/60">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300 inline-flex items-center gap-2 pt-3">
                    <Icon name="Clock" size={14} strokeWidth={1.8} />
                    {pick(course.duration)}
                  </span>
                  <span className="text-sm text-bone-200 pt-3">
                    {pick(course.socialProof)}
                  </span>
                </div>
              </div>

              {/* Description column */}
              <div className="lg:col-span-5 flex flex-col gap-3 lg:border-l lg:border-ink-600/50 lg:pl-8">
                <Eyebrow>{t('result.courseTitle')}</Eyebrow>
                <p className="text-bone-200 leading-relaxed text-balance">
                  {pick(course.description)}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="relative px-7 sm:px-12 pb-2">
              <div className="border-t border-ink-600/60 pt-8">
                <Eyebrow>{t('result.courseBenefits')}</Eyebrow>
                <Stagger
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  stagger={0.07}
                >
                  {course.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-start gap-3 rounded-2xl',
                        'border border-ink-600/60 bg-ink-850/50',
                        'p-4',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'grid place-items-center w-9 h-9 rounded-xl shrink-0',
                          'bg-ink-800/80 border border-ink-600',
                          ACCENT_TEXT[role.accent],
                        )}
                      >
                        <Icon name={b.iconName} size={16} strokeWidth={1.6} />
                      </span>
                      <p className="text-sm text-bone-100 leading-relaxed pt-1">
                        {pick(b.text)}
                      </p>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>

            {/* Modules */}
            <div className="relative px-7 sm:px-12 pt-10 pb-8 sm:pb-12">
              <div className="border-t border-ink-600/60 pt-8">
                <Eyebrow>{t('result.courseModules')}</Eyebrow>
                <Stagger
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                  stagger={0.06}
                >
                  {course.modules.map((m, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-start gap-4 rounded-2xl',
                        'border border-ink-600/60 bg-ink-850/40',
                        'p-5',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums pt-1 shrink-0',
                          ACCENT_TEXT[role.accent],
                        )}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg text-bone-50 leading-tight tracking-tight">
                          {pick(m.title)}
                        </h4>
                        <p className="mt-2 text-sm text-bone-200 leading-relaxed">
                          {pick(m.description)}
                        </p>
                      </div>
                    </div>
                  ))}
                </Stagger>

                {/* Guarantee */}
                <p className="mt-8 text-sm text-bone-300/80 italic leading-relaxed text-balance max-w-2xl">
                  {pick(course.guarantee)}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 5. CTA ROW ──────────────────────────────────── */}
        <section className="relative mt-12 sm:mt-16 flex flex-wrap items-center gap-3 sm:gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEnroll}
            iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
            className="text-base sm:text-lg px-8 sm:px-10 py-4"
          >
            {t('result.joinNow')}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleEnroll}
          >
            {t('result.learnMore')}
          </Button>
          <Button variant="ghost" size="md" onClick={handleRetake}>
            {t('result.retake')}
          </Button>

          {/* Hidden accent badge so the import has a touch — keeps role accent visible */}
          <span className="sr-only">
            <Badge variant={ACCENT_BADGE[role.accent]}>{pick(role.name)}</Badge>
          </span>
        </section>
      </div>
    </PageShell>
  );
}
