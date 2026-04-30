import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Heart, MessageCircle, Send, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { useQuizState } from '../lib/quizState';
import { useI18n } from '../lib/i18n';
import { cn } from '../lib/cn';

/* ─── Stage timeline (ms — cumulative durations per stage) ─────────────
 *   stage 0: idle (instant)
 *   stage 1: read task           1200 ms
 *   stage 2: write copy          3000 ms
 *   stage 3: render visual       2200 ms
 *   stage 4: done                ∞
 *   total runtime ≈ 6.4 s
 * ───────────────────────────────────────────────────────────────────── */
const STAGE_DURATIONS_MS: readonly number[] = [0, 1200, 3000, 2200, 0];

const AI_MODEL_TAG = 'aurora-3.5';

/* ─── Typewriter ──────────────────────────────────────────────────────── */
interface TypewriterProps {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  className?: string;
  showCaret?: boolean;
  onDone?: () => void;
  /** When false, renders the full string instantly (reduced-motion). */
  animated?: boolean;
}

function Typewriter({
  text,
  speedMs = 22,
  startDelayMs = 0,
  className,
  showCaret = true,
  onDone,
  animated = true,
}: TypewriterProps) {
  const [n, setN] = useState(animated ? 0 : text.length);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!animated) {
      setN(text.length);
      onDoneRef.current?.();
      return;
    }
    setN(0);
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const begin = () => {
      const tick = (idx: number) => {
        if (cancelled) return;
        setN(idx);
        if (idx >= text.length) {
          onDoneRef.current?.();
          return;
        }
        timeoutId = setTimeout(() => tick(idx + 1), speedMs);
      };
      tick(0);
    };

    timeoutId = setTimeout(begin, startDelayMs);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [text, speedMs, startDelayMs, animated]);

  return (
    <span className={className}>
      {text.slice(0, n)}
      {showCaret && animated && n < text.length ? (
        <span
          aria-hidden="true"
          className="inline-block w-[0.5ch] h-[1em] -mb-[0.15em] ml-[1px] bg-amber animate-pulse-soft align-baseline"
        />
      ) : null}
    </span>
  );
}

/* ─── Generated visual ────────────────────────────────────────────────── */
function GeneratedVisual({ stage, reduce }: { stage: number; reduce: boolean }) {
  const noiseVisible = stage < 3;
  const composing = stage === 3;
  const revealed = stage >= 3;

  // Floating shape definitions — placement, size, color, delay.
  type Shape = {
    type: 'circle' | 'square' | 'ring' | 'dot' | 'tri';
    left: string;
    top: string;
    size: number;
    color: 'amber' | 'iris' | 'neon' | 'lime' | 'bone';
    delay: number;
    rotate?: number;
  };
  const shapes = useMemo<Shape[]>(
    () => [
      { type: 'circle', left: '14%', top: '22%', size: 64, color: 'amber', delay: 0.05 },
      { type: 'square', left: '70%', top: '18%', size: 44, color: 'iris', delay: 0.18, rotate: 14 },
      { type: 'ring', left: '76%', top: '68%', size: 80, color: 'neon', delay: 0.32 },
      { type: 'dot', left: '28%', top: '74%', size: 18, color: 'lime', delay: 0.42 },
      { type: 'tri', left: '50%', top: '50%', size: 56, color: 'amber', delay: 0.5, rotate: -8 },
      { type: 'dot', left: '58%', top: '30%', size: 10, color: 'bone', delay: 0.6 },
    ],
    [],
  );

  const colorMap: Record<string, string> = {
    amber: '#ff6b35',
    iris: '#7c6cff',
    neon: '#22d3ee',
    lime: '#c4f061',
    bone: '#f7f5ef',
  };

  return (
    <div className="relative aspect-square w-full max-w-[380px] mx-auto rounded-2xl overflow-hidden border border-ink-600/80 lumen">
      {/* Base gradient field — always visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 18% 22%, rgba(255,107,53,0.55) 0%, rgba(255,107,53,0) 55%),' +
            'radial-gradient(120% 90% at 82% 78%, rgba(124,108,255,0.55) 0%, rgba(124,108,255,0) 60%),' +
            'radial-gradient(140% 110% at 50% 50%, rgba(34,211,238,0.18) 0%, rgba(8,8,12,0) 70%),' +
            'linear-gradient(150deg, #0b0b12 0%, #13131d 100%)',
        }}
      />

      {/* Noise / shimmer veil — fades out by stage 4 */}
      <AnimatePresence>
        {noiseVisible ? (
          <motion.div
            key="noise"
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")",
              mixBlendMode: 'overlay',
              opacity: 0.45,
            }}
          />
        ) : null}
      </AnimatePresence>

      {/* Diagonal scan-line sweep during composition (stages 1–3) */}
      {!reduce && stage >= 1 && stage <= 3 ? (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-y-4 -left-1/3 w-1/2 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,107,53,0.22) 45%, rgba(255,255,255,0.35) 50%, rgba(124,108,255,0.22) 55%, transparent 100%)',
            mixBlendMode: 'screen',
            filter: 'blur(2px)',
          }}
          initial={{ x: '-40%' }}
          animate={{ x: '260%' }}
          transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
        />
      ) : null}

      {/* Floating shape composition — staggered fade-in once "composing" */}
      {(composing || revealed) &&
        shapes.map((s, i) => {
          const c = colorMap[s.color] ?? '#fff';
          const common = {
            position: 'absolute' as const,
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) rotate(${s.rotate ?? 0}deg)`,
          };
          let inner: React.ReactNode = null;
          if (s.type === 'circle') {
            inner = (
              <div
                style={{
                  ...common,
                  borderRadius: '9999px',
                  background: `radial-gradient(circle at 30% 30%, ${c} 0%, ${c}88 60%, ${c}00 100%)`,
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 60px ${c}66`,
                }}
              />
            );
          } else if (s.type === 'square') {
            inner = (
              <div
                style={{
                  ...common,
                  borderRadius: '6px',
                  background: `linear-gradient(135deg, ${c} 0%, ${c}55 100%)`,
                  boxShadow: `0 0 40px ${c}55`,
                }}
              />
            );
          } else if (s.type === 'ring') {
            inner = (
              <div
                style={{
                  ...common,
                  borderRadius: '9999px',
                  border: `2px solid ${c}`,
                  boxShadow: `inset 0 0 24px ${c}44, 0 0 32px ${c}55`,
                }}
              />
            );
          } else if (s.type === 'dot') {
            inner = (
              <div
                style={{
                  ...common,
                  borderRadius: '9999px',
                  background: c,
                  boxShadow: `0 0 18px ${c}aa`,
                }}
              />
            );
          } else {
            // triangle via clip-path
            inner = (
              <div
                style={{
                  ...common,
                  background: `linear-gradient(180deg, ${c} 0%, ${c}55 100%)`,
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  filter: 'blur(0.4px)',
                  boxShadow: `0 0 30px ${c}66`,
                }}
              />
            );
          }
          return (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : s.delay,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              {inner}
            </motion.div>
          );
        })}

      {/* Corner watermark — model tag — appears with the composition */}
      {revealed ? (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.7 }}
          className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.24em] text-bone-50/80 px-2 py-1 rounded-full bg-ink-950/55 border border-bone-50/10 backdrop-blur-sm"
        >
          {AI_MODEL_TAG}
        </motion.div>
      ) : null}

      {/* Pre-render "EMPTY CANVAS" tag while idle/reading — adds credibility */}
      {!revealed ? (
        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.24em] text-bone-50/55 px-2 py-1 rounded-full bg-ink-950/55 border border-bone-50/10 backdrop-blur-sm inline-flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-amber animate-pulse-soft" />
          rendering
        </div>
      ) : null}
    </div>
  );
}

/* ─── Stage indicator ─────────────────────────────────────────────────── */
function StageRail({ stage, labels }: { stage: number; labels: string[] }) {
  return (
    <ol className="relative flex flex-col gap-3 sm:gap-4 pl-0 sm:border-l border-ink-600/60 sm:pl-5">
      {labels.map((label, i) => {
        const idx = i + 1;
        const completed = stage > idx;
        const active = stage === idx;
        return (
          <li
            key={label}
            className={cn(
              'flex items-center gap-3',
              'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] tabular-nums',
              completed
                ? 'text-lime'
                : active
                  ? 'text-amber-soft'
                  : 'text-bone-300/45',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'grid place-items-center shrink-0 rounded-full',
                'w-5 h-5 border transition-colors duration-300',
                completed
                  ? 'bg-lime/15 border-lime/60 text-lime'
                  : active
                    ? 'bg-amber/15 border-amber/70 text-amber animate-pulse-soft'
                    : 'bg-ink-800/60 border-ink-600 text-bone-300/40',
              )}
            >
              {completed ? (
                <Check size={12} strokeWidth={2.6} />
              ) : (
                <span className="text-[9px] leading-none">
                  {String(idx).padStart(2, '0')}
                </span>
              )}
            </span>
            <span className="truncate">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function Demo() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { state } = useQuizState();
  const reduce = useReducedMotion();

  // Guard — must have completed both quiz answers
  if (state.goal === null || state.context === null) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <PageShell>
      <DemoBody reduce={!!reduce} t={t} onNext={() => navigate('/anticipation')} />
    </PageShell>
  );
}

interface DemoBodyProps {
  reduce: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
  onNext: () => void;
}

function DemoBody({ reduce, t, onNext }: DemoBodyProps) {
  // Stage index: 0 = idle (instant intro), 1..4 active stages
  const [stage, setStage] = useState<number>(reduce ? 4 : 1);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Stage 2 sub-state: which line of the post is currently typing
  const [headlineDone, setHeadlineDone] = useState(reduce);
  const [bodyDone, setBodyDone] = useState(reduce);
  const [hashtagsDone, setHashtagsDone] = useState(reduce);

  // ── Timeline driver ──
  useEffect(() => {
    if (reduce) {
      setStage(4);
      return;
    }
    setStage(1);
    const t1 = setTimeout(() => setStage(2), STAGE_DURATIONS_MS[1]);
    const t2 = setTimeout(
      () => setStage(3),
      STAGE_DURATIONS_MS[1] + STAGE_DURATIONS_MS[2],
    );
    const t3 = setTimeout(
      () => setStage(4),
      STAGE_DURATIONS_MS[1] + STAGE_DURATIONS_MS[2] + STAGE_DURATIONS_MS[3],
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduce]);

  // ── Elapsed timer (frozen at stage 4) ──
  useEffect(() => {
    if (reduce) return;
    if (stage >= 4) return;
    const start = Date.now();
    const id = setInterval(() => {
      setElapsedMs(Date.now() - start + 0); // monotonically increasing display
    }, 80);
    return () => clearInterval(id);
  }, [stage, reduce]);

  // Freeze elapsed at completion to a clean number
  const elapsedSeconds = useMemo(() => {
    if (reduce) {
      const total = STAGE_DURATIONS_MS.reduce((a, b) => a + b, 0);
      return (total / 1000).toFixed(1);
    }
    if (stage >= 4) {
      const total = STAGE_DURATIONS_MS.reduce((a, b) => a + b, 0);
      return (total / 1000).toFixed(1);
    }
    return (elapsedMs / 1000).toFixed(1);
  }, [elapsedMs, stage, reduce]);

  const stageLabels = [t('demo.stage1'), t('demo.stage2'), t('demo.stage3'), t('demo.stage4')];
  const promptLabel = t('demo.promptLabel');
  const promptValue = t('demo.promptValue');
  const headline = t('demo.outputHeadline');
  const body = t('demo.outputBody');
  const hashtags = t('demo.outputHashtags');

  const ctaEnabled = stage >= 4;

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* Decorative orbs */}
      <Orb
        size={420}
        color="amber"
        className="left-[-120px] top-[-120px]"
        pulse={false}
      />
      <Orb
        size={340}
        color="iris"
        className="right-[-80px] top-[30%]"
        pulse={false}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-4 sm:pt-8">
        {/* ─────── LEFT COLUMN — Title + meta + stage rail ─────── */}
        <aside className="lg:col-span-5 flex flex-col gap-8">
          <Eyebrow>{t('demo.eyebrow')}</Eyebrow>

          <h1 className="font-display text-display-md text-bone-50 text-balance tracking-tight leading-[1.05]">
            {t('demo.title')}
          </h1>

          <p className="max-w-md text-base sm:text-lg text-bone-200 leading-relaxed text-balance">
            {t('demo.subtitle')}
          </p>

          {/* Prompt strip — small editorial card */}
          <div className="mt-2 flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300/80">
              {promptLabel}
            </span>
            <div
              className={cn(
                'relative rounded-2xl border border-ink-600/80',
                'bg-ink-900/60 backdrop-blur-sm',
                'px-5 py-4 text-bone-50',
                'font-mono text-[13px] leading-relaxed',
              )}
            >
              <span className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
              <span className="text-amber/80 mr-2">{'>'}</span>
              {stage >= 1 ? (
                <Typewriter
                  text={promptValue}
                  speedMs={18}
                  showCaret={stage === 1}
                  animated={!reduce}
                />
              ) : (
                <span className="text-bone-300/50">{promptValue}</span>
              )}
            </div>
          </div>

          {/* Stage rail */}
          <div className="mt-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300/80 mb-3 block">
              {AI_MODEL_TAG} · pipeline
            </span>
            <StageRail stage={stage} labels={stageLabels} />
          </div>

          {/* Elapsed timer */}
          <div className="mt-2 flex items-baseline gap-3 border-t border-ink-600/50 pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300/70">
              t+
            </span>
            <span
              className={cn(
                'font-mono tabular-nums text-2xl sm:text-3xl tracking-tight',
                stage >= 4 ? 'text-lime' : 'text-bone-50',
              )}
            >
              {t('demo.elapsed', { seconds: elapsedSeconds })}
            </span>
          </div>
        </aside>

        {/* ─────── RIGHT COLUMN — Generation surface ─────── */}
        <section className="lg:col-span-7">
          <div className="relative glass-strong lumen rounded-3xl p-5 sm:p-7 overflow-hidden">
            {/* Top edge sweep — present until completion */}
            {!reduce && stage < 4 ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.9) 50%, transparent 100%)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }}
              />
            ) : null}

            {/* Header strip — model + status */}
            <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-ink-600/60">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-8 h-8 rounded-xl',
                    'bg-amber/15 text-amber border border-amber/40',
                  )}
                  aria-hidden="true"
                >
                  <Sparkles size={15} strokeWidth={1.8} />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100">
                    {AI_MODEL_TAG}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-bone-300/70">
                    inference · streaming
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.24em] tabular-nums',
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border',
                  stage >= 4
                    ? 'border-lime/40 bg-lime/10 text-lime'
                    : 'border-amber/40 bg-amber/10 text-amber-soft',
                )}
              >
                <span
                  className={cn(
                    'inline-block w-1.5 h-1.5 rounded-full bg-current',
                    stage < 4 && 'animate-pulse-soft',
                  )}
                />
                {stage >= 4 ? '100%' : `${String(Math.min(99, Math.round((stage / 4) * 100))).padStart(2, '0')}%`}
              </span>
            </div>

            {/* The composition — text + visual side-by-side once available */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* Visual canvas */}
              <div className="md:col-span-2 order-2 md:order-1">
                <GeneratedVisual stage={stage} reduce={reduce} />
              </div>

              {/* Post text panel */}
              <article
                className={cn(
                  'md:col-span-3 order-1 md:order-2 relative flex flex-col gap-4',
                  'rounded-2xl border border-ink-600/70 bg-ink-900/60',
                  'p-5 sm:p-6 min-h-[300px]',
                )}
              >
                {/* Post chrome (avatar + handle) */}
                <header className="flex items-center gap-3 pb-3 border-b border-ink-600/50">
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full grid place-items-center bg-gradient-to-br from-amber to-iris text-ink-950 font-display text-sm"
                  >
                    A
                  </span>
                  <div className="flex flex-col leading-tight min-w-0">
                    <span className="font-display text-sm text-bone-50 truncate">
                      aurora.studio
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-bone-300/70">
                      sponsored · just now
                    </span>
                  </div>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.22em] text-bone-300/60">
                    /post
                  </span>
                </header>

                {/* Output text — typewriter cascade in stage 2 */}
                <div className="flex flex-col gap-3 min-h-[120px]">
                  {stage >= 2 ? (
                    <h2 className="font-display text-2xl sm:text-3xl text-bone-50 leading-[1.1] tracking-tight">
                      <Typewriter
                        text={headline}
                        speedMs={32}
                        startDelayMs={120}
                        animated={!reduce}
                        showCaret={!headlineDone}
                        onDone={() => setHeadlineDone(true)}
                      />
                    </h2>
                  ) : (
                    <h2 className="font-display text-2xl sm:text-3xl text-bone-300/30 leading-[1.1] tracking-tight select-none">
                      {headline}
                    </h2>
                  )}

                  {stage >= 2 && headlineDone ? (
                    <p className="text-base text-bone-100 leading-relaxed text-balance">
                      <Typewriter
                        text={body}
                        speedMs={14}
                        startDelayMs={80}
                        animated={!reduce}
                        showCaret={!bodyDone}
                        onDone={() => setBodyDone(true)}
                      />
                    </p>
                  ) : stage < 2 ? (
                    <p className="text-base text-bone-300/25 leading-relaxed select-none">
                      {body}
                    </p>
                  ) : null}

                  {stage >= 2 && bodyDone ? (
                    <p className="font-mono text-[12px] tracking-[0.05em] text-iris-soft">
                      <Typewriter
                        text={hashtags}
                        speedMs={26}
                        startDelayMs={60}
                        animated={!reduce}
                        showCaret={!hashtagsDone}
                        onDone={() => setHashtagsDone(true)}
                      />
                    </p>
                  ) : null}
                </div>

                {/* Engagement row — fades in only at stage 4 */}
                <AnimatePresence>
                  {stage >= 4 ? (
                    <motion.footer
                      key="engagement"
                      initial={
                        reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                      className="mt-auto pt-3 border-t border-ink-600/50 flex items-center gap-5 font-mono text-[11px] tabular-nums text-bone-300"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Heart size={13} strokeWidth={1.8} className="text-amber" />
                        2 384
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle size={13} strokeWidth={1.8} />
                        147
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Send size={13} strokeWidth={1.8} />
                        59
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-lime">
                        <Check size={13} strokeWidth={2.4} />
                        ready
                      </span>
                    </motion.footer>
                  ) : null}
                </AnimatePresence>
              </article>
            </div>

            {/* Bottom status caption */}
            <div className="mt-5 pt-4 border-t border-ink-600/60 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300/70">
                {stage >= 1 && stage < 4 ? stageLabels[stage - 1] : stageLabels[3]}
                <span className="text-amber mx-2">·</span>
                <span className="text-bone-300/55">
                  prompt → text → visual → render
                </span>
              </span>
              <span className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300/55 tabular-nums">
                {t('demo.elapsed', { seconds: elapsedSeconds })}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ─────── CTA row ─────── */}
      <div className="relative mt-12 sm:mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="md"
          onClick={onNext}
        >
          {t('demo.skip')}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!ctaEnabled}
          iconRight={<ArrowRight size={18} strokeWidth={1.8} />}
        >
          {t('demo.cta')}
        </Button>
      </div>
    </div>
  );
}
