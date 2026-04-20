import { useCallback, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
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
import { useQuizState } from '../lib/quizState';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';

const ACCENT_TEXT: Record<AccentName, string> = {
  amber: 'text-amber-soft',
  iris: 'text-iris-soft',
  neon: 'text-neon-soft',
  lime: 'text-lime',
};

const ACCENT_SKILL: Record<AccentName, 'amber' | 'iris' | 'neon' | 'lime'> = {
  amber: 'amber',
  iris: 'iris',
  neon: 'neon',
  lime: 'lime',
};

const ACCENT_ORB: Record<AccentName, 'amber' | 'iris' | 'neon' | 'lime'> = {
  amber: 'amber',
  iris: 'iris',
  neon: 'neon',
  lime: 'lime',
};

const ACCENT_HEX: Record<AccentName, string> = {
  amber: '#ff6b35',
  iris: '#7c6cff',
  neon: '#22d3ee',
  lime: '#c4f061',
};

const SECONDARY_HEX = '#7c6cff'; // iris as secondary across the board.

function formatUSD(n: number, lang: 'en' | 'ru'): string {
  return Math.round(n).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US');
}

interface ServiceDatum {
  name: string;
  min: number;
  max: number;
  offset: number;
  range: number;
  unit: string;
}

function RangeTooltip({
  active,
  payload,
  lang,
  t,
}: {
  active?: boolean;
  payload?: { payload: ServiceDatum }[];
  lang: 'en' | 'ru';
  t: (k: string, v?: Record<string, string | number>) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0]!.payload;
  return (
    <div className="glass-strong lumen rounded-xl px-3.5 py-2.5 text-xs">
      <div className="font-display text-sm text-bone-50 leading-tight">{d.name}</div>
      <div className="mt-1 font-mono text-[11px] tabular-nums text-bone-200">
        {t('dashboard.pricePerUnit', {
          min: formatUSD(d.min, lang),
          max: formatUSD(d.max, lang),
          unit: d.unit,
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const pick = useLocale();
  const { state, reset } = useQuizState();
  const reduce = useReducedMotion();

  const [toast, setToast] = useState<string | null>(null);

  const top = state.results?.[0];
  const topRole = state.topRoleId ? ROLES_BY_ID[state.topRoleId] : undefined;

  // Build chart data hooks before any early return to keep hook order stable.
  const chartData = useMemo<ServiceDatum[]>(() => {
    if (!topRole) return [];
    return topRole.services.map((s) => ({
      name: pick(s.name),
      min: s.priceMin,
      max: s.priceMax,
      offset: s.priceMin,
      range: Math.max(0, s.priceMax - s.priceMin),
      unit: pick(s.unit),
    }));
  }, [topRole, pick]);

  const maxPrice = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.max(...chartData.map((d) => d.max));
  }, [chartData]);

  const handleShare = useCallback(async () => {
    if (!topRole) return;
    const message = t('dashboard.shareMessage', { role: pick(topRole.name) });
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const text = `${message} ${url}`.trim();
    try {
      const nav = typeof navigator !== 'undefined' ? navigator : undefined;
      if (nav && typeof nav.share === 'function') {
        await nav.share({ title: 'AI Career Compass', text, url });
        return;
      }
      if (nav && nav.clipboard && typeof nav.clipboard.writeText === 'function') {
        await nav.clipboard.writeText(text);
        setToast(t('dashboard.copied'));
        window.setTimeout(() => setToast(null), 2200);
      }
    } catch {
      // user cancelled — silent.
    }
  }, [topRole, pick, t]);

  const handleRetake = useCallback(() => {
    reset();
    navigate('/');
  }, [reset, navigate]);

  if (!topRole || !top) {
    return <Navigate to="/quiz" replace />;
  }

  const accentHex = ACCENT_HEX[topRole.accent];

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Back crumb ── */}
        <div className="pt-4 sm:pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/salary')}
            icon={<ArrowLeft size={14} strokeWidth={1.8} />}
          >
            {t('quiz.back')}
          </Button>
        </div>

        {/* ── A. HERO CARD ────────────────────────────── */}
        <section className="mt-6">
          <Card
            variant="glass-strong"
            padding="none"
            className="relative overflow-hidden rounded-[2rem] bg-ink-900/95"
          >
            {/* Gradient ribbon */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.15]"
              style={{
                background: `radial-gradient(120% 80% at 85% 10%, ${topRole.gradient[0]}44, transparent 55%), radial-gradient(100% 80% at 10% 90%, ${topRole.gradient[1]}33, transparent 60%)`,
              }}
            />
            <Orb
              size={360}
              color={ACCENT_ORB[topRole.accent]}
              className="right-[-80px] top-[-60px]"
              pulse={false}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12">
              <div className="lg:col-span-8 flex flex-col gap-5">
                <Eyebrow>{t('dashboard.eyebrow')}</Eyebrow>
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
                      'bg-ink-900/90 border border-ink-600 lumen',
                      ACCENT_TEXT[topRole.accent],
                    )}
                  >
                    <Icon name={topRole.iconName} size={38} strokeWidth={1.4} />
                  </span>
                  <Badge variant={topRole.accent === 'lime' ? 'lime' : topRole.accent}>
                    {t('dashboard.matchLabel', { percent: top.percent })}
                  </Badge>
                </div>
                <h1 className="font-display text-display-lg text-bone-50 text-balance tracking-tight leading-[0.98]">
                  {pick(topRole.name)}
                </h1>
                <p className="font-display italic text-2xl text-bone-200 text-balance max-w-2xl">
                  {pick(topRole.slogan)}
                </p>
                <p className="text-bone-200 leading-relaxed max-w-2xl text-balance">
                  {pick(topRole.description)}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-4 justify-end">
                <div className="glass lumen rounded-2xl p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300">
                    {t('dashboard.monthlyIncome')}
                  </span>
                  <div className="mt-3 font-mono text-3xl sm:text-4xl tabular-nums text-bone-50">
                    ${formatUSD(topRole.monthlyIncome.min, lang)}
                    <span className="text-bone-300 mx-2">–</span>$
                    {formatUSD(topRole.monthlyIncome.max, lang)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── MAIN GRID — magazine layout ─────────────── */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* B. Core skills */}
          <Card variant="glass" padding="lg" className="lg:col-span-5">
            <Eyebrow>{t('dashboard.coreSkills')}</Eyebrow>
            <div className="mt-6 flex flex-col gap-5">
              {topRole.skills.map((skill, idx) => (
                <SkillBar
                  key={skill.key}
                  label={t(`skills.${skill.key}` as `skills.${SkillName}`)}
                  value={skill.value}
                  accent={ACCENT_SKILL[topRole.accent]}
                  index={idx}
                />
              ))}
            </div>
          </Card>

          {/* C. What they actually do */}
          <Card variant="glass" padding="lg" className="lg:col-span-7">
            <Eyebrow>{t('dashboard.whatTheyDo')}</Eyebrow>
            <Stagger className="mt-6 flex flex-col gap-4" stagger={0.07}>
              {pick(topRole.whatTheyDo).map((line, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.22em] tabular-nums pt-1 shrink-0',
                      ACCENT_TEXT[topRole.accent],
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
        </section>

        {/* D. Services & pricing */}
        <section className="mt-8">
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Eyebrow>{t('dashboard.servicesPricing')}</Eyebrow>
              <Badge variant="outline">{t('dashboard.servicesUnit')}</Badge>
            </div>

            {/* Chart — desktop only */}
            <div className="hidden sm:block mt-8 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 12, right: 32, bottom: 12, left: 12 }}
                  barCategoryGap={14}
                >
                  <CartesianGrid
                    horizontal={false}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="2 6"
                  />
                  <XAxis
                    type="number"
                    domain={[0, Math.ceil(maxPrice * 1.08)]}
                    tickFormatter={(v) => `$${formatUSD(Number(v), lang)}`}
                    tick={{
                      fill: '#b7aea0',
                      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                    }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{
                      fill: '#d8d2c3',
                      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                    }}
                    width={160}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.035)' }}
                    content={(props) => (
                      <RangeTooltip
                        active={props.active as boolean | undefined}
                        payload={
                          props.payload as unknown as { payload: ServiceDatum }[] | undefined
                        }
                        lang={lang}
                        t={t}
                      />
                    )}
                  />
                  {/* Offset spacer bar so range bar starts at `min`. */}
                  <Bar
                    dataKey="offset"
                    stackId="range"
                    fill="transparent"
                    isAnimationActive={false}
                  />
                  <Bar
                    dataKey="range"
                    stackId="range"
                    radius={[999, 999, 999, 999]}
                    isAnimationActive={!reduce}
                    animationDuration={reduce ? 0 : 900}
                  >
                    {chartData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={idx % 2 === 0 ? accentHex : SECONDARY_HEX}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Plain list — always visible */}
            <ul className="mt-6 sm:mt-8 flex flex-col gap-3">
              {topRole.services.map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-4 border-t border-ink-600/60 pt-3 first:border-t-0 first:pt-0"
                >
                  <span className="text-bone-100">{pick(s.name)}</span>
                  <span
                    className={cn(
                      'font-mono text-sm tabular-nums whitespace-nowrap',
                      ACCENT_TEXT[topRole.accent],
                    )}
                  >
                    {t('dashboard.pricePerUnit', {
                      min: formatUSD(s.priceMin, lang),
                      max: formatUSD(s.priceMax, lang),
                      unit: pick(s.unit),
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* E. Where to start */}
        <section className="mt-8">
          <Eyebrow>{t('dashboard.whereToStart')}</Eyebrow>
          <Stagger
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            stagger={0.08}
          >
            {topRole.resources.map((r, idx) => (
              <Card key={idx} variant="glass" padding="lg" className="h-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid place-items-center w-10 h-10 rounded-xl',
                      'bg-ink-800/70 border border-ink-600',
                      ACCENT_TEXT[topRole.accent],
                    )}
                  >
                    <Icon name={r.iconName} size={18} strokeWidth={1.6} />
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.24em] tabular-nums',
                      ACCENT_TEXT[topRole.accent],
                    )}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl text-bone-50 leading-tight">
                  {pick(r.title)}
                </h3>
                <p className="text-bone-200 leading-relaxed text-sm">
                  {pick(r.description)}
                </p>
              </Card>
            ))}
          </Stagger>
        </section>

        {/* F. Bottom actions */}
        <section className="mt-12 sm:mt-16 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" onClick={handleRetake}>
            {t('dashboard.retake')}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleShare}
            icon={<Share2 size={16} strokeWidth={1.6} />}
          >
            {t('dashboard.share')}
          </Button>
        </section>

        {/* Toast */}
        <div
          className="fixed inset-x-0 bottom-8 z-40 flex justify-center pointer-events-none"
          aria-live="polite"
        >
          {toast ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              className="glass-strong lumen rounded-full px-4 py-2 inline-flex items-center gap-2 pointer-events-auto"
            >
              <Check size={14} strokeWidth={2} className="text-amber" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100">
                {toast}
              </span>
            </motion.div>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
