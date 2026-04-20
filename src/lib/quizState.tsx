import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { QUESTIONS } from '../data/questions';
import { ROLES } from '../data/roles';
import { guessDelta, scoreAnswers, type GuessDelta, type RoleResult } from './scoring';

export type QuizAnswer = {
  questionId: string;
  optionId: string;
};

export interface QuizState {
  answers: QuizAnswer[];
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
  results: null,
  topRoleId: null,
  guess: null,
  guessDelta: null,
};

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'answer': {
      const existingIdx = state.answers.findIndex(
        (a) => a.questionId === action.questionId,
      );
      const nextAnswers =
        existingIdx >= 0
          ? state.answers.map((a, i) =>
              i === existingIdx ? { questionId: action.questionId, optionId: action.optionId } : a,
            )
          : [...state.answers, { questionId: action.questionId, optionId: action.optionId }];
      // Invalidate results / guess whenever answers change — they are now stale.
      return {
        ...state,
        answers: nextAnswers,
        results: null,
        topRoleId: null,
        guess: null,
        guessDelta: null,
      };
    }
    case 'finish': {
      const results = scoreAnswers(state.answers, QUESTIONS, ROLES);
      const topRoleId = results[0]?.roleId ?? null;
      return {
        ...state,
        results,
        topRoleId,
        // When recomputing, clear any stale guess evaluation.
        guess: null,
        guessDelta: null,
      };
    }
    case 'setGuess': {
      if (!state.topRoleId) {
        return { ...state, guess: action.amount, guessDelta: null };
      }
      const topRole = ROLES.find((r) => r.id === state.topRoleId);
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
