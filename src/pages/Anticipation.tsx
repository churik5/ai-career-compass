import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Orb } from '../components/Orb';
import { PageShell } from '../components/PageShell';
import { Stagger } from '../components/Stagger';
import { useQuizState } from '../lib/quizState';
import { useI18n } from '../lib/i18n';
import { cn } from '../lib/cn';

type BulletAccent = 'amber' | 'iris' | 'neon';

interface Bullet {
  num: string;
  title: string;
  body: string;
  accent: BulletAccent;
}

const ACCENT_TEXT: Record<BulletAccent, string> = {
  amber: 'text-amber-soft',
  iris: 'text-iris-soft',
  neon: 'text-neon-soft',
};

const ACCENT_LINE: Record<BulletAccent, string> = {
  amber: 'bg-amber/70',
  iris: 'bg-iris/70',
  neon: 'bg-neon/70',
};

export default function Anticipation() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { state } = useQuizState();
  const reduce = useReducedMotion();

  if (state.goal === null) {
    return <Navigate to="/quiz" replace />;
  }

  const bullets: Bullet[] = [
    {
      num: '01',
      title: t('anticipation.bullet1Title'),
      body: t('anticipation.bullet1Body'),
      accent: 'amber',
    },
    {
      num: '02',
      title: t('anticipation.bullet2Title'),
      body: t('anticipation.bullet2Body'),
      accent: 'iris',
    },
    {
      num: '03',
      title: t('anticipation.bullet3Title'),
      body: t('anticipation.bullet3Body'),
      accent: 'neon',
    },
  ];

  const handleBack = () => {
    // Try to step back through history; fall back to /demo so the user does
    // not end up outside the funnel if there is no prior entry.
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/demo');
  };

  return (
    <PageShell>
      <div className="relative mx-auto w-full max-w-3xl">
        {/* Decorative atmosphere */}
        <Orb
          size={520}
          color="amber"
          className="left-1/2 top-[-180px] -translate-x-1/2"
          pulse={false}
        />
        <Orb
          size={360}
          color="iris"
          className="right-[-120px] top-[40%]"
        />

        {/* Centered hero stack */}
        <div className="relative flex flex-col items-center gap-8 pt-8 sm:pt-14 text-center">
          <Eyebrow>{t('anticipation.eyebrow')}</Eyebrow>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-display-lg text-bone-50 text-balance tracking-tight leading-[0.98]"
          >
            {t('anticipation.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-2xl text-lg sm:text-xl text-bone-200 leading-relaxed text-balance"
          >
            {t('anticipation.subtitle')}
          </motion.p>
        </div>

        {/* Bullets */}
        <Stagger
          className="relative mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          stagger={0.12}
          delay={0.2}
        >
          {bullets.map((b) => (
            <div
              key={b.num}
              className={cn(
                'relative glass lumen rounded-3xl p-6 sm:p-7',
                'h-full flex flex-col gap-4 text-left',
              )}
            >
              <span
                className={cn(
                  'inline-flex items-center gap-2',
                  'font-mono text-[11px] tracking-[0.22em] uppercase tabular-nums',
                  ACCENT_TEXT[b.accent],
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn('inline-block h-px w-6', ACCENT_LINE[b.accent])}
                />
                {b.num}
              </span>
              <h3 className="font-display text-2xl text-bone-50 leading-tight tracking-tight">
                {b.title}
              </h3>
              <p className="text-bone-200 leading-relaxed text-sm sm:text-base">
                {b.body}
              </p>
            </div>
          ))}
        </Stagger>

        {/* Action row */}
        <div className="relative mt-14 sm:mt-16 flex flex-col-reverse sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="ghost"
            size="md"
            onClick={handleBack}
            icon={<ArrowLeft size={16} strokeWidth={1.8} />}
          >
            {t('anticipation.back')}
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/result')}
            iconRight={<ArrowUpRight size={18} strokeWidth={1.8} />}
          >
            {t('anticipation.cta')}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
