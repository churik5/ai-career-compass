import type { Question } from '../data/questions';
import type { Role } from '../data/roles';

export type Answer = {
  questionId: string;
  optionId: string;
};

export type RoleResult = {
  roleId: string;
  role: Role;
  score: number;
  /** 0-100, relative to the top raw score across all roles for these answers. */
  percent: number;
  /** 1, 2, 3, ... */
  rank: number;
};

/**
 * Score a set of answers against the quiz and role catalogue.
 *
 * For every answer, looks up the option's `weights` by matching
 * `questionId` + `optionId` and sums per role id. Roles not scored end up at 0.
 *
 * `percent` is computed relative to the top raw score across all roles for
 * these answers, so the leader is always 100 (when at least one positive
 * weight exists) and the rest are a fair comparison.
 *
 * Robust to:
 * - answers referencing unknown questions or options (skipped)
 * - duplicate answers for the same question (only the first is counted)
 * - empty answers / empty weights (returns every role with score 0, percent 0)
 */
export function scoreAnswers(
  answers: Answer[],
  questions: Question[],
  roles: Role[],
): RoleResult[] {
  const questionById = new Map<string, Question>();
  for (const q of questions) {
    questionById.set(q.id, q);
  }

  const seenQuestions = new Set<string>();
  const scoreByRole = new Map<string, number>();

  for (const answer of answers) {
    if (seenQuestions.has(answer.questionId)) continue;
    const q = questionById.get(answer.questionId);
    if (!q) continue;
    const option = q.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    seenQuestions.add(answer.questionId);

    // The current quiz `Option` type carries no weights — the funnel always
    // resolves to `ai-content-manager` upstream. We keep `scoreAnswers`
    // around for older call sites that may still hand in option objects with
    // a legacy `weights` field, so we read it defensively.
    const legacyWeights = (option as { weights?: Record<string, unknown> })
      .weights;
    if (legacyWeights) {
      for (const [roleId, weightRaw] of Object.entries(legacyWeights)) {
        if (typeof weightRaw !== 'number' || Number.isNaN(weightRaw)) continue;
        scoreByRole.set(roleId, (scoreByRole.get(roleId) ?? 0) + weightRaw);
      }
    }
  }

  let topRawScore = 0;
  for (const v of scoreByRole.values()) {
    if (v > topRawScore) topRawScore = v;
  }

  const results: RoleResult[] = roles.map((role) => {
    const score = scoreByRole.get(role.id) ?? 0;
    const percent =
      topRawScore > 0 ? Math.round((score / topRawScore) * 100) : 0;
    return {
      roleId: role.id,
      role,
      score,
      percent,
      rank: 0, // filled after sort
    };
  });

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // stable tiebreaker: role id alphabetically, so ranks are deterministic
    return a.roleId.localeCompare(b.roleId);
  });

  for (let i = 0; i < results.length; i += 1) {
    results[i].rank = i + 1;
  }

  return results;
}

export type GuessDelta = {
  status: 'undershot' | 'close' | 'inside' | 'overshot';
  /** 0 when inside the range; otherwise percent off the nearest edge. */
  offByPercent: number;
  /** Midpoint of the [min, max] range. */
  midpoint: number;
};

/**
 * Compare a user's salary guess to an actual [min, max] range.
 *
 * - `inside` → guess lies inside [min, max].
 * - `close`  → guess is within ±5% of the nearest edge (but still outside).
 * - `undershot` → guess is below min and more than 5% off.
 * - `overshot`  → guess is above max and more than 5% off.
 *
 * `offByPercent` is the distance to the nearest edge expressed as a percent of
 * that edge, rounded to the nearest integer. Zero when inside the range.
 *
 * Guards:
 * - if min > max the values are swapped, so the callers cannot trip on
 *   malformed input.
 * - if the nearest edge is 0 (degenerate), percent falls back to the absolute
 *   distance to avoid division by zero.
 */
export function guessDelta(
  guess: number,
  actualMin: number,
  actualMax: number,
): GuessDelta {
  const min = Math.min(actualMin, actualMax);
  const max = Math.max(actualMin, actualMax);
  const midpoint = (min + max) / 2;

  if (guess >= min && guess <= max) {
    return { status: 'inside', offByPercent: 0, midpoint };
  }

  const nearestEdge = guess < min ? min : max;
  const diff = Math.abs(guess - nearestEdge);
  const offRatio = nearestEdge !== 0 ? diff / nearestEdge : diff;
  const offByPercent = Math.round(offRatio * 100);

  if (offByPercent <= 5) {
    return { status: 'close', offByPercent, midpoint };
  }

  return {
    status: guess < min ? 'undershot' : 'overshot',
    offByPercent,
    midpoint,
  };
}
