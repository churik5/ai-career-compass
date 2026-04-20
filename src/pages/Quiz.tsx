import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { PageShell } from '../components/PageShell';
import { ProgressBar } from '../components/ProgressBar';
import { QUESTIONS } from '../data/questions';
import { useQuizState } from '../lib/quizState';
import { useI18n, useLocale } from '../lib/i18n';
import { cn } from '../lib/cn';

export default function Quiz() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const pick = useLocale();
  const { answer, finish, getAnswer } = useQuizState();
  const reduce = useReducedMotion();
  const total = QUESTIONS.length;

  const [current, setCurrent] = useState(0);
  const question = QUESTIONS[current]!;
  const currentSelection = getAnswer(question.id);
  const progressPercent = ((current + 1) / total) * 100;

  // Track focus index for arrow-key keyboard nav within the radio group.
  const [focusIdx, setFocusIdx] = useState<number>(() => {
    if (!currentSelection) return 0;
    const idx = question.options.findIndex((o) => o.id === currentSelection);
    return idx >= 0 ? idx : 0;
  });

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep focus index in sync when the question changes (not user interaction).
  // focusIdx is also mutated by arrow keys, so it must be state; the effect only
  // resets it on question swap.
  useEffect(() => {
    const saved = getAnswer(question.id);
    const idx = saved ? question.options.findIndex((o) => o.id === saved) : 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusIdx(idx >= 0 ? idx : 0);
  }, [question.id, question.options, getAnswer]);

  const handlePick = useCallback(
    (optionId: string) => {
      answer(question.id, optionId);
    },
    [answer, question.id],
  );

  const handleNext = useCallback(() => {
    if (!currentSelection) return;
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      return;
    }
    finish();
    navigate('/result');
  }, [current, currentSelection, finish, navigate, total]);

  const handleBack = useCallback(() => {
    if (current === 0) {
      navigate('/');
      return;
    }
    setCurrent((c) => c - 1);
  }, [current, navigate]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;
      const optionCount = question.options.length;
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        const next = (focusIdx + 1) % optionCount;
        setFocusIdx(next);
        optionRefs.current[next]?.focus();
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        const next = (focusIdx - 1 + optionCount) % optionCount;
        setFocusIdx(next);
        optionRefs.current[next]?.focus();
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        const opt = question.options[focusIdx];
        if (opt) handlePick(opt.id);
      }
    },
    [focusIdx, question.options, handlePick],
  );

  const nextLabel = current === total - 1 ? t('quiz.finish') : t('quiz.next');
  const backLabel = current === 0 ? t('quiz.backHome') : t('quiz.back');

  const hint = useMemo(
    () => (question.hint ? pick(question.hint) : t('quiz.chooseOne')),
    [question.hint, pick, t],
  );

  const motionKey = question.id;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-4xl">
        {/* ── top meter ── */}
        <div className="flex items-center justify-between gap-6 pt-4 sm:pt-6">
          <div className="flex-1">
            <ProgressBar value={progressPercent} accent="amber" height={2} />
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-300 tabular-nums shrink-0">
            {t('quiz.progressShort', {
              current: String(current + 1).padStart(2, '0'),
              total: String(total).padStart(2, '0'),
            })}
          </span>
        </div>

        <div className="mt-8">
          <Eyebrow>{t('quiz.eyebrow')}</Eyebrow>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={motionKey}
            initial={{ opacity: 0, x: reduce ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -12 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* ── prompt ── */}
            <h1 className="mt-6 font-display text-display-md text-bone-50 text-balance leading-[1.1]">
              {pick(question.prompt)}
            </h1>
            {hint ? (
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-bone-300 max-w-xl">
                {hint}
              </p>
            ) : null}

            {/* ── options ── */}
            <div
              role="radiogroup"
              aria-label={pick(question.prompt)}
              onKeyDown={handleKeyDown}
              className="mt-10 grid grid-cols-1 gap-3 sm:gap-4"
            >
              {question.options.map((opt, idx) => {
                const selected = currentSelection === opt.id;
                const isFocusable = idx === focusIdx;
                return (
                  <motion.div
                    key={opt.id}
                    ref={(el: HTMLDivElement | null) => {
                      optionRefs.current[idx] = el;
                    }}
                    role="radio"
                    aria-checked={selected}
                    tabIndex={isFocusable ? 0 : -1}
                    onClick={() => handlePick(opt.id)}
                    onFocus={() => setFocusIdx(idx)}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    className={cn(
                      'group relative cursor-pointer rounded-2xl',
                      'glass lumen px-5 py-5 sm:px-7 sm:py-6',
                      'border transition-all duration-200',
                      'focus:outline-none',
                      selected
                        ? 'border-amber/80 shadow-glow'
                        : 'border-transparent hover:border-bone-300/25',
                    )}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Marker */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-1 shrink-0 grid place-items-center',
                          'w-6 h-6 rounded-full border transition-colors duration-200',
                          selected
                            ? 'border-amber bg-amber text-ink-950'
                            : 'border-bone-300/40 bg-ink-800/80 text-transparent',
                        )}
                      >
                        <Check size={14} strokeWidth={2.4} />
                      </span>

                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            'font-mono text-[10px] uppercase tracking-[0.24em] mr-2',
                            selected ? 'text-amber-soft' : 'text-bone-300/70',
                          )}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span
                          className={cn(
                            'text-base sm:text-lg leading-relaxed',
                            selected ? 'text-bone-50' : 'text-bone-100',
                          )}
                        >
                          {pick(opt.label)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── nav row ── */}
        <div className="mt-12 sm:mt-14 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={handleBack}
            icon={<ArrowLeft size={16} strokeWidth={1.8} />}
          >
            {backLabel}
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!currentSelection}
            iconRight={<ArrowRight size={18} strokeWidth={1.8} />}
          >
            {nextLabel}
          </Button>
        </div>

      </div>
    </PageShell>
  );
}
