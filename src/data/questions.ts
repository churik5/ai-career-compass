/**
 * Two-question funnel for the AI Content Manager course.
 * Q1 — what do you want AI to do for you? (goal)
 * Q2 — where are you right now? (context)
 *
 * No scoring weights — the matched profession is always
 * AI Content Manager. The (goal, context) tuple is used
 * only for personalization on the result page.
 */

export type Localized = { en: string; ru: string };

export type GoalId =
  | 'earn-money'
  | 'find-clients'
  | 'make-content'
  | 'simplify-life'
  | 'start-fresh';

export type ContextId = 'newbie' | 'has-job' | 'has-business' | 'blogger';

export type Option = {
  id: string;
  label: Localized;
};

export type Question = {
  id: 'goal' | 'context';
  prompt: Localized;
  hint?: Localized;
  options: Option[];
};

export const GOAL_QUESTION: Question = {
  id: 'goal',
  prompt: {
    en: 'What do you want AI to do for you?',
    ru: 'Что тебе сделать с помощью нейросетей?',
  },
  options: [
    { id: 'earn-money', label: { en: 'Earn money', ru: 'Заработать деньги' } },
    { id: 'find-clients', label: { en: 'Find clients', ru: 'Найти клиентов' } },
    { id: 'make-content', label: { en: 'Make content', ru: 'Делать контент' } },
    { id: 'simplify-life', label: { en: 'Simplify life', ru: 'Упростить жизнь' } },
    { id: 'start-fresh', label: { en: 'Start from scratch', ru: 'Начать с нуля' } },
  ],
};

export const CONTEXT_QUESTION: Question = {
  id: 'context',
  prompt: {
    en: 'Where are you right now?',
    ru: 'Где ты сейчас?',
  },
  options: [
    { id: 'newbie', label: { en: 'Just starting out', ru: 'Новичок' } },
    { id: 'has-job', label: { en: 'I have a job', ru: 'Есть работа' } },
    { id: 'has-business', label: { en: 'I have a business', ru: 'Есть бизнес' } },
    { id: 'blogger', label: { en: 'I am a blogger', ru: 'Блогер' } },
  ],
};

export const QUESTIONS: Question[] = [GOAL_QUESTION, CONTEXT_QUESTION];

export const GOAL_IDS: GoalId[] = [
  'earn-money',
  'find-clients',
  'make-content',
  'simplify-life',
  'start-fresh',
];

export const CONTEXT_IDS: ContextId[] = ['newbie', 'has-job', 'has-business', 'blogger'];
