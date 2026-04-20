import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { Stagger } from '../components/Stagger';
import { Icon } from '../lib/icon';
import { ROLES, type AccentName } from '../data/roles';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';

const ACCENT_RING: Record<AccentName, string> = {
  amber: 'hover:border-amber/60 hover:shadow-glow',
  iris: 'hover:border-iris/60',
  neon: 'hover:border-neon/50 hover:shadow-glow-cyan',
  lime: 'hover:border-lime/60',
};

const ACCENT_TEXT: Record<AccentName, string> = {
  amber: 'text-amber-soft',
  iris: 'text-iris-soft',
  neon: 'text-neon-soft',
  lime: 'text-lime',
};

function FloatingGlyphs() {
  const reduce = useReducedMotion();
  // A loose, hand-placed composition of role icons.
  const positions = [
    { left: '10%', top: '8%', size: 44, rotate: -6 },
    { left: '62%', top: '3%', size: 36, rotate: 4 },
    { left: '82%', top: '22%', size: 52, rotate: -2 },
    { left: '4%', top: '38%', size: 32, rotate: 8 },
    { left: '44%', top: '28%', size: 58, rotate: -3 },
    { left: '72%', top: '52%', size: 40, rotate: 2 },
    { left: '16%', top: '68%', size: 46, rotate: -7 },
    { left: '54%', top: '74%', size: 34, rotate: 5 },
    { left: '88%', top: '78%', size: 38, rotate: -4 },
    { left: '32%', top: '52%', size: 30, rotate: 3 },
    { left: '22%', top: '90%', size: 40, rotate: -6 },
    { left: '70%', top: '90%', size: 32, rotate: 6 },
    { left: '46%', top: '92%', size: 28, rotate: 0 },
  ];

  return (
    <div className="relative h-[540px] w-full">
      <Orb size={420} color="amber" className="left-[-80px] top-[-40px]" />
      <Orb size={360} color="iris" className="right-[-60px] top-[40%]" pulse={false} />
      <Orb size={240} color="neon" className="left-[20%] bottom-[-40px]" />
      {ROLES.slice(0, 13).map((role, idx) => {
        const pos = positions[idx] ?? positions[0]!;
        return (
          <motion.div
            key={role.id}
            className={cn(
              'absolute grid place-items-center',
              'rounded-full glass lumen',
              ACCENT_TEXT[role.accent],
            )}
            style={{
              left: pos.left,
              top: pos.top,
              width: pos.size,
              height: pos.size,
              transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.8,
              delay: reduce ? 0 : idx * 0.05,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <Icon name={role.iconName} size={Math.round(pos.size * 0.45)} strokeWidth={1.4} />
          </motion.div>
        );
      })}
    </div>
  );
}

function RolesTicker({ names }: { names: string[] }) {
  // Duplicate for seamless loop.
  const doubled = [...names, ...names];
  return (
    <div className="relative overflow-hidden w-full h-8 mt-6 border-y border-ink-600/60">
      <div
        className="absolute inset-y-0 left-0 flex items-center gap-8 whitespace-nowrap animate-ticker"
        style={{ width: 'max-content' }}
      >
        {doubled.map((name, idx) => (
          <span
            key={`${name}-${idx}`}
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-300/70 inline-flex items-center gap-3"
          >
            {name}
            <span aria-hidden="true" className="inline-block w-1 h-1 rounded-full bg-amber/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const pick = useLocale();
  const reduce = useReducedMotion();

  const roleNames = useMemo(() => ROLES.map((r) => pick(r.name).toUpperCase()), [pick]);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl">
        {/* ───── HERO ─────────────────────────────────── */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start pt-6 sm:pt-10">
          {/* Left column */}
          <div className="relative lg:col-span-7 flex flex-col gap-8">
            <Eyebrow>{t('landing.eyebrow')}</Eyebrow>

            <h1 className="font-display text-display-xl text-bone-50 text-balance tracking-tight">
              <span className="block">
                {t('landing.titleA')}{' '}
                <em className="italic text-bone-100 font-normal">{t('landing.titleItalic')}</em>
              </span>
              <span className="relative inline-block">
                <span className="relative z-10">{t('landing.titleAccent')}</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 h-[0.18em] bg-amber origin-left"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 1.1, delay: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </span>
            </h1>

            <p className="max-w-xl text-lg sm:text-xl text-bone-200 text-balance leading-relaxed">
              {t('landing.lede')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/quiz')}
                iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
              >
                {t('landing.cta')}
              </Button>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300 pl-2">
                {t('landing.stats')}
              </span>
            </div>
          </div>

          {/* Right column — glyph composition */}
          <div className="relative lg:col-span-5 h-[440px] sm:h-[540px] lg:h-[600px]">
            <FloatingGlyphs />
          </div>
        </section>

        {/* ───── ROLES TICKER ──────────────────────── */}
        <RolesTicker names={roleNames} />

        {/* ───── THE 13 ROLES CHIPS ─────────────── */}
        <section className="mt-16 sm:mt-24">
          <Eyebrow>{t('landing.rolesChipLabel')}</Eyebrow>
          <div className="mt-4 -mx-5 sm:mx-0">
            <div className="flex flex-wrap gap-2 px-5 sm:px-0 overflow-x-auto scrollbar-thin">
              {ROLES.map((role) => (
                <Link
                  key={role.id}
                  to="/quiz"
                  className={cn(
                    'group inline-flex items-center gap-2 shrink-0',
                    'rounded-full border border-ink-600 bg-ink-850/60',
                    'px-3.5 py-2 transition-colors duration-200',
                    ACCENT_RING[role.accent],
                  )}
                >
                  <span className={cn('inline-flex', ACCENT_TEXT[role.accent])}>
                    <Icon name={role.iconName} size={16} strokeWidth={1.6} />
                  </span>
                  <span className="text-sm text-bone-100 group-hover:text-bone-50 transition-colors">
                    {pick(role.name)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS ──────────────────── */}
        <section className="mt-20 sm:mt-28">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-display-md text-bone-50 text-balance max-w-xl">
              {t('landing.howTitle')}
            </h2>
            <span className="hidden sm:inline-flex text-amber">
              <Sparkles size={18} strokeWidth={1.5} />
            </span>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {[
              { num: '01', title: t('landing.step1Title'), body: t('landing.step1Body'), accent: 'amber' as const },
              { num: '02', title: t('landing.step2Title'), body: t('landing.step2Body'), accent: 'iris' as const },
              { num: '03', title: t('landing.step3Title'), body: t('landing.step3Body'), accent: 'neon' as const },
            ].map((step) => (
              <div
                key={step.num}
                className="relative glass lumen rounded-3xl p-7 sm:p-8 h-full flex flex-col gap-4"
              >
                <span
                  className={cn(
                    'font-mono text-[11px] tracking-[0.22em] uppercase inline-flex items-center gap-2',
                    ACCENT_TEXT[step.accent],
                  )}
                >
                  <span className="inline-block w-6 h-px bg-current" />
                  {step.num}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-bone-50 leading-tight">
                  {step.title}
                </h3>
                <p className="text-bone-200 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </Stagger>
        </section>

        {/* ───── BOTTOM CTA ─────────────────────── */}
        <section className="mt-20 sm:mt-28 relative">
          <Orb size={380} color="amber" className="right-0 top-[-80px]" pulse={false} />
          <div className="relative glass-strong lumen rounded-[2rem] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-lg">
              <Eyebrow>{t('landing.eyebrow')}</Eyebrow>
              <p className="font-display text-2xl sm:text-3xl text-bone-50 text-balance">
                {t('landing.titleA')}{' '}
                <em className="italic font-normal">{t('landing.titleItalic')}</em>{' '}
                <span className="text-amber">{t('landing.titleAccent')}</span>.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/quiz')}
              iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
            >
              {t('landing.cta')}
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
