import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { ROLES, ROLES_BY_ID } from '../data/roles';
import type { GoalId, ContextId } from '../data/questions';
import { guessDelta, type GuessDelta, type RoleResult } from './scoring';

const TARGET_ROLE_ID = 'ai-content-manager';

export type QuizAnswer = {
  questionId: string;
  optionId: string;
};

export interface QuizState {
  answers: QuizAnswer[];
  goal: GoalId | null;
  context: ContextId | null;
  results: RoleResult[] | null;
  topRoleId: string | null;
  guess: number | null;
  guessDelta: GuessDelta | null;
}

type Action =
  | { type: 'answer'; questionId: string; optionId: string }
  | { type: 'finish' }
  | { type: 'setGuess'; amount: number }
  | { type: 'reset' };

const initialState: QuizState = {
  answers: [],
  goal: null,
  context: null,
  results: null,
  topRoleId: null,
  guess: null,
  guessDelta: null,
};

function buildResults(): RoleResult[] {
  return ROLES.map((role, idx) => ({
    roleId: role.id,
    role,
    score: role.id === TARGET_ROLE_ID ? 100 : 0,
    percent: role.id === TARGET_ROLE_ID ? 100 : 0,
    rank: role.id === TARGET_ROLE_ID ? 1 : idx + 2,
  })).sort((a, b) => b.score - a.score);
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'answer': {
      const existingIdx = state.answers.findIndex(
        (a) => a.questionId === action.questionId,
      );
      const nextAnswers =
        existingIdx >= 0
          ? state.answers.map((a, i) =>
              i === existingIdx
                ? { questionId: action.questionId, optionId: action.optionId }
                : a,
            )
          : [...state.answers, { questionId: action.questionId, optionId: action.optionId }];

      // Mirror goal/context for fast lookup downstream.
      const nextGoal =
        action.questionId === 'goal' ? (action.optionId as GoalId) : state.goal;
      const nextContext =
        action.questionId === 'context' ? (action.optionId as ContextId) : state.context;

      return {
        ...state,
        answers: nextAnswers,
        goal: nextGoal,
        context: nextContext,
        // Invalidate downstream — answers changed.
        results: null,
        topRoleId: null,
        guess: null,
        guessDelta: null,
      };
    }
    case 'finish': {
      const results = buildResults();
      return {
        ...state,
        results,
        topRoleId: TARGET_ROLE_ID,
        guess: null,
        guessDelta: null,
      };
    }
    case 'setGuess': {
      const topRole = state.topRoleId ? ROLES_BY_ID[state.topRoleId] : undefined;
      if (!topRole) {
        return { ...state, guess: action.amount, guessDelta: null };
      }
      const delta = guessDelta(
        action.amount,
        topRole.monthlyIncome.min,
        topRole.monthlyIncome.max,
      );
      return { ...state, guess: action.amount, guessDelta: delta };
    }
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

interface QuizContextValue {
  state: QuizState;
  answer: (questionId: string, optionId: string) => void;
  finish: () => void;
  setGuess: (amount: number) => void;
  reset: () => void;
  getAnswer: (questionId: string) => string | undefined;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const answer = useCallback((questionId: string, optionId: string) => {
    dispatch({ type: 'answer', questionId, optionId });
  }, []);

  const finish = useCallback(() => {
    dispatch({ type: 'finish' });
  }, []);

  const setGuess = useCallback((amount: number) => {
    dispatch({ type: 'setGuess', amount });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const getAnswer = useCallback(
    (questionId: string) =>
      state.answers.find((a) => a.questionId === questionId)?.optionId,
    [state.answers],
  );

  const value = useMemo<QuizContextValue>(
    () => ({ state, answer, finish, setGuess, reset, getAnswer }),
    [state, answer, finish, setGuess, reset, getAnswer],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuizState(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizState must be used inside <QuizStateProvider>');
  return ctx;
}
