/**
 * Sales data for the AI Content Manager course — shown on the result page
 * after the funnel. Bilingual content; prices are in USD.
 */

import type { Localized } from './questions';

export type CourseModule = {
  title: Localized;
  description: Localized;
};

export type CourseBenefit = {
  text: Localized;
  /** lucide-react icon name */
  iconName: string;
};

export type Course = {
  id: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  /** strikethrough original price */
  priceOriginal: number;
  /** current sale price */
  priceCurrent: number;
  /** ISO 4217 — drives currency formatting */
  currency: 'USD';
  /** e.g. "6 weeks" */
  duration: Localized;
  /** Bulleted benefits with icons */
  benefits: CourseBenefit[];
  /** 4-6 numbered modules */
  modules: CourseModule[];
  /** CTA copy */
  ctaPrimary: Localized;
  ctaSecondary: Localized;
  /** social proof line, e.g. "1,200+ students" */
  socialProof: Localized;
  /** guarantee line */
  guarantee: Localized;
};

export const AI_CONTENT_MANAGER_COURSE: Course = {
  id: 'ai-content-manager-course',
  title: {
    en: 'AI Content Manager — Pro Track',
    ru: 'AI-Контент-менеджер — PRO-курс',
  },
  subtitle: {
    en: 'Six weeks. Real client work. A portfolio you can actually send.',
    ru: 'Шесть недель. Реальная работа с клиентами. Портфолио, которое не стыдно показать.',
  },
  description: {
    en: 'A practical course that turns AI tools into a paying skill. Learn to plan content, write posts, generate visuals, and run channels for clients — without burning out.',
    ru: 'Практический курс, который превращает AI-инструменты в денежный навык. Учим планировать контент, писать посты, генерировать визуал и вести каналы клиентам — без выгорания.',
  },
  priceOriginal: 690,
  priceCurrent: 290,
  currency: 'USD',
  duration: {
    en: '6 weeks',
    ru: '6 недель',
  },
  benefits: [
    {
      text: {
        en: 'Live Q&A with mentors twice a week',
        ru: 'Разборы с менторами два раза в неделю',
      },
      iconName: 'Users',
    },
    {
      text: {
        en: 'Real client briefs to practice on',
        ru: 'Реальные клиентские брифы на практику',
      },
      iconName: 'Briefcase',
    },
    {
      text: {
        en: 'Portfolio of 12 cases by the end',
        ru: 'Портфолио из 12 кейсов на выходе',
      },
      iconName: 'FolderOpen',
    },
    {
      text: {
        en: 'Lifetime access to materials and updates',
        ru: 'Пожизненный доступ к материалам и обновлениям',
      },
      iconName: 'Infinity',
    },
    {
      text: {
        en: 'Job board with vetted client requests',
        ru: 'Доска заказов с проверенными клиентами',
      },
      iconName: 'Target',
    },
  ],
  modules: [
    {
      title: { en: '01 — AI toolbox', ru: '01 — AI-инструментарий' },
      description: {
        en: 'ChatGPT, Midjourney, Suno, Runway — what to use, when, and how to chain them.',
        ru: 'ChatGPT, Midjourney, Suno, Runway — что когда использовать и как связать в цепочку.',
      },
    },
    {
      title: { en: '02 — Voice & strategy', ru: '02 — Голос и стратегия' },
      description: {
        en: 'Find a brand voice in two days. Build a 30-day content plan that ships.',
        ru: 'Находим голос бренда за два дня. Делаем контент-план на 30 дней, который дойдёт до публикации.',
      },
    },
    {
      title: { en: '03 — Production line', ru: '03 — Конвейер производства' },
      description: {
        en: 'Posts, reels, carousels, newsletters — produce a week in a single afternoon.',
        ru: 'Посты, рилсы, карусели, рассылки — выпускаем неделю контента за один заход.',
      },
    },
    {
      title: { en: '04 — Selling the service', ru: '04 — Продаём услугу' },
      description: {
        en: 'Pricing, proposals, retainers. Land your first three clients in week four.',
        ru: 'Цены, коммерческие предложения, ретейнеры. Закрываем первых трёх клиентов на четвёртой неделе.',
      },
    },
    {
      title: { en: '05 — Running channels', ru: '05 — Ведение каналов' },
      description: {
        en: 'Calendars, analytics, reporting. Keep clients happy and channels growing.',
        ru: 'Календари, аналитика, отчётность. Клиент доволен, каналы растут.',
      },
    },
    {
      title: { en: '06 — Scale & retainer', ru: '06 — Масштаб и ретейнер' },
      description: {
        en: 'From freelancing to a small studio. Hire help, raise rates, build a wait-list.',
        ru: 'От фриланса к маленькой студии. Нанимаем помощников, поднимаем чек, делаем waitlist.',
      },
    },
  ],
  ctaPrimary: {
    en: 'Enroll now — save $400',
    ru: 'Записаться — скидка $400',
  },
  ctaSecondary: {
    en: 'Take me through the program',
    ru: 'Подробнее о программе',
  },
  socialProof: {
    en: 'Joined by 1,200+ students. Average first paid client in 4 weeks.',
    ru: '1200+ студентов. Первый платящий клиент в среднем — через 4 недели.',
  },
  guarantee: {
    en: '14-day money-back guarantee. If it doesn’t click, you get a full refund.',
    ru: 'Возврат денег в течение 14 дней. Не зашло — вернём всё.',
  },
};
