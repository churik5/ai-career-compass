/**
 * Personalized result phrases keyed on (goal × context) — 5×4 = 20 combos.
 * Each combo gives a short headline and a 1-2 sentence intro that ties the
 * user's selected goal + context to the AI Content Manager outcome.
 */

import type { GoalId, ContextId, Localized } from './questions';

export type Personalization = {
  /** 5-7 word punchy headline */
  headline: Localized;
  /** 1-2 sentence intro tying answers to the role */
  intro: Localized;
  /** A single concrete win to expect, used in bullets */
  promise: Localized;
};

type Key = `${GoalId}__${ContextId}`;

export const PERSONALIZATION: Record<Key, Personalization> = {
  // ───── earn-money ─────────────────────────────────────────────────
  'earn-money__newbie': {
    headline: {
      en: 'A first paid client in 4 weeks',
      ru: 'Первый платящий клиент через 4 недели',
    },
    intro: {
      en: 'You want money and you are starting from zero. AI Content Manager is the fastest paid skill you can pick up — clients pay for posts, not for years of experience.',
      ru: 'Ты хочешь деньги и начинаешь с нуля. AI-контент-менеджер — самый быстрый платный навык: клиенты платят за посты, а не за годы опыта.',
    },
    promise: {
      en: 'First paid order — within a month of starting.',
      ru: 'Первый платный заказ — в течение месяца после старта.',
    },
  },
  'earn-money__has-job': {
    headline: {
      en: 'A side income that does not eat your evenings',
      ru: 'Подработка, которая не съест твои вечера',
    },
    intro: {
      en: 'You already have a job and want extra income. AI Content Manager is the cleanest side hustle — 5–10 hours a week, fully remote, paid in dollars.',
      ru: 'У тебя уже есть работа, нужен дополнительный доход. AI-контент-менеджер — самая чистая подработка: 5–10 часов в неделю, удалённо, оплата в долларах.',
    },
    promise: {
      en: '$500–1500/mo on the side without quitting.',
      ru: '$500–1500 в месяц сверху, не увольняясь.',
    },
  },
  'earn-money__has-business': {
    headline: {
      en: 'Replace the agency you’re overpaying',
      ru: 'Замени агентство, которое переплачиваешь',
    },
    intro: {
      en: 'You run a business and you’re bleeding cash on outside marketing. Learn to run your own content engine — and sell the leftover capacity to other founders.',
      ru: 'У тебя бизнес и уходят деньги на внешний маркетинг. Научись вести контент сам — и продай свободные часы другим фаундерам.',
    },
    promise: {
      en: 'Cut marketing spend, add a second revenue stream.',
      ru: 'Срежь расходы на маркетинг, добавь второй поток дохода.',
    },
  },
  'earn-money__blogger': {
    headline: {
      en: 'Turn the audience you already have into clients',
      ru: 'Преврати свою аудиторию в клиентов',
    },
    intro: {
      en: 'You have a blog and a following — that’s the hard part already done. Add a paid service on top, and your audience becomes your sales channel.',
      ru: 'У тебя есть блог и аудитория — самое сложное уже сделано. Добавь платную услугу — и аудитория становится твоим каналом продаж.',
    },
    promise: {
      en: 'A paid offer your audience converts on.',
      ru: 'Платный оффер, на который конвертирует твоя аудитория.',
    },
  },

  // ───── find-clients ───────────────────────────────────────────────
  'find-clients__newbie': {
    headline: {
      en: 'Three real clients by week six',
      ru: 'Три реальных клиента к шестой неделе',
    },
    intro: {
      en: 'You want clients and don’t have any yet. We give you a battle-tested outreach script and a job board — by the end you’ll have signed three.',
      ru: 'Ты хочешь клиентов, а пока их нет. Мы дадим рабочий скрипт переписки и доску заказов — к концу курса у тебя подписано три договора.',
    },
    promise: {
      en: 'Three signed clients before graduation.',
      ru: 'Три подписанных клиента до выпуска.',
    },
  },
  'find-clients__has-job': {
    headline: {
      en: 'Find clients without leaving your day job',
      ru: 'Найди клиентов, не бросая основную работу',
    },
    intro: {
      en: 'You have a job and want to test client work on the side. We will show you outreach that works in evenings — small clients, monthly retainers, no chaos.',
      ru: 'У тебя работа, хочешь попробовать клиентов параллельно. Покажем переписку, которая работает по вечерам — маленькие клиенты, ежемесячные ретейнеры, без хаоса.',
    },
    promise: {
      en: 'Two retainer clients in 6 weeks — evenings only.',
      ru: 'Два клиента на ретейнере за 6 недель — только вечера.',
    },
  },
  'find-clients__has-business': {
    headline: {
      en: 'Cross-sell content services to your existing network',
      ru: 'Продай контент-услугу своей сети контактов',
    },
    intro: {
      en: 'You already know business owners. Half of them need content. We hand you a script and a positioning that turn warm contacts into paying clients.',
      ru: 'Ты уже знаешь предпринимателей — половине нужен контент. Дадим скрипт и позиционирование, которые превращают тёплые контакты в платящих клиентов.',
    },
    promise: {
      en: 'Five new clients from your existing network.',
      ru: 'Пять новых клиентов из твоей текущей сети.',
    },
  },
  'find-clients__blogger': {
    headline: {
      en: 'Turn DMs into a wait-list',
      ru: 'Преврати личные сообщения в waitlist',
    },
    intro: {
      en: 'Your DMs are full of brand pitches you’re ignoring. Flip the script — pitch them a content retainer, run their channel, get paid monthly.',
      ru: 'У тебя в личке предложения от брендов, которые ты игнорируешь. Переверни ситуацию — предложи им ретейнер на ведение, получай ежемесячно.',
    },
    promise: {
      en: 'Brand DMs converted into monthly retainers.',
      ru: 'Личка с брендами — в ежемесячные ретейнеры.',
    },
  },

  // ───── make-content ───────────────────────────────────────────────
  'make-content__newbie': {
    headline: {
      en: 'Ship content like a pro from week one',
      ru: 'Делай контент как профи уже с первой недели',
    },
    intro: {
      en: 'You want to make content but don’t know where to start. The course gives you a turnkey production line — posts, visuals, reels, all stitched together.',
      ru: 'Ты хочешь делать контент, но не знаешь, с чего начать. Курс даёт готовый конвейер — посты, визуал, рилсы — собранный в одну линию.',
    },
    promise: {
      en: 'A finished piece every single week.',
      ru: 'Готовая работа каждую неделю — без пропусков.',
    },
  },
  'make-content__has-job': {
    headline: {
      en: 'Build a personal brand without the burnout',
      ru: 'Делай личный бренд без выгорания',
    },
    intro: {
      en: 'You want to grow a personal brand alongside your job. We will show you a one-hour-a-day system that produces a full week of posts.',
      ru: 'Ты хочешь развивать личный бренд параллельно работе. Покажем систему «час в день», которая выдаёт неделю постов.',
    },
    promise: {
      en: 'A week of content — built in one hour.',
      ru: 'Неделя контента — собрана за один час.',
    },
  },
  'make-content__has-business': {
    headline: {
      en: 'A content engine for your business — without an agency',
      ru: 'Контент-машина для бизнеса — без агентства',
    },
    intro: {
      en: 'You run a business and the content is always last on the list. AI Content Manager is the operator who makes it the first thing done by Monday.',
      ru: 'У тебя бизнес, и контент всегда последним в списке. AI-контент-менеджер — оператор, у которого к понедельнику всё уже выпущено.',
    },
    promise: {
      en: 'Channel that posts itself, on schedule, on brand.',
      ru: 'Канал, который постит сам — по расписанию, в стиле бренда.',
    },
  },
  'make-content__blogger': {
    headline: {
      en: 'Make in two hours what took you two days',
      ru: 'Делай за два часа то, на что уходило два дня',
    },
    intro: {
      en: 'You already make content — let’s 5x the throughput. AI handles the drafts, the visuals, the variants. You stay the curator.',
      ru: 'Ты уже делаешь контент — давай ускорим в пять раз. AI берёт черновики, визуал, варианты. Ты остаёшься куратором.',
    },
    promise: {
      en: '5x output, zero quality loss.',
      ru: 'В 5 раз больше выходов, качество — то же.',
    },
  },

  // ───── simplify-life ──────────────────────────────────────────────
  'simplify-life__newbie': {
    headline: {
      en: 'Stop wrestling AI tools — start using them',
      ru: 'Хватит мучиться с AI — начни им пользоваться',
    },
    intro: {
      en: 'You want AI to make life easier. We teach the small set of tools that handle 90% of daily tasks — without the YouTube rabbit hole.',
      ru: 'Хочешь, чтобы AI облегчал жизнь. Учим маленькому набору инструментов, который закрывает 90% ежедневных задач — без бесконечного YouTube.',
    },
    promise: {
      en: 'Daily tasks halved within two weeks.',
      ru: 'Рутина сокращается вдвое за две недели.',
    },
  },
  'simplify-life__has-job': {
    headline: {
      en: 'Get hours back in your week',
      ru: 'Верни себе часы в неделю',
    },
    intro: {
      en: 'You have a job — emails, reports, decks, posts. We will show you which AI prompts return time without sacrificing quality.',
      ru: 'У тебя работа — письма, отчёты, презентации, посты. Покажем, какие AI-промпты возвращают время, не теряя качества.',
    },
    promise: {
      en: '6+ hours saved every working week.',
      ru: '6+ часов сэкономлено каждую рабочую неделю.',
    },
  },
  'simplify-life__has-business': {
    headline: {
      en: 'Run the marketing engine in 30 minutes a day',
      ru: 'Веди маркетинг за 30 минут в день',
    },
    intro: {
      en: 'You run a business and you’re drowning. Outsource your content brain to AI — keep the strategy, drop the keyboard time.',
      ru: 'У тебя бизнес, и ты в перегрузе. Отдай мозг контента AI — оставь стратегию, забудь про клавиатуру.',
    },
    promise: {
      en: 'Marketing on autopilot, decisions on you.',
      ru: 'Маркетинг на автопилоте, решения — за тобой.',
    },
  },
  'simplify-life__blogger': {
    headline: {
      en: 'Reclaim the weekends from the content treadmill',
      ru: 'Верни выходные у контент-беговой дорожки',
    },
    intro: {
      en: 'You blog, and the algorithm never stops. Build a Sunday-night batch system — five posts queued, week is done.',
      ru: 'Ты блогер, и алгоритм не отдыхает. Собери систему «батч в воскресенье вечером» — пять постов в очереди, неделя закрыта.',
    },
    promise: {
      en: 'Weekends back. Algorithm still fed.',
      ru: 'Выходные снова твои. Алгоритм при этом сыт.',
    },
  },

  // ───── start-fresh ────────────────────────────────────────────────
  'start-fresh__newbie': {
    headline: {
      en: 'A clean start with a real income path',
      ru: 'Чистый старт с понятным путём к доходу',
    },
    intro: {
      en: 'You are starting from zero, on purpose. AI Content Manager is the cleanest entry point into the AI economy — small surface area, fast first wins.',
      ru: 'Ты стартуешь с нуля — по своему выбору. AI-контент-менеджер — самый чистый вход в AI-экономику: небольшой объём, быстрые первые победы.',
    },
    promise: {
      en: 'A working skill in 6 weeks. A first client in 4.',
      ru: 'Рабочий навык за 6 недель. Первый клиент — за 4.',
    },
  },
  'start-fresh__has-job': {
    headline: {
      en: 'A real exit path from the day job',
      ru: 'Реальный план выхода из найма',
    },
    intro: {
      en: 'You want to leave the job — but not into a void. Build the side income first, prove it for three months, walk away with a real client list.',
      ru: 'Хочешь уйти из найма — но не в пустоту. Сначала собери параллельный доход, докажи на трёх месяцах, выйди с реальным списком клиентов.',
    },
    promise: {
      en: '3 months of replacement income before you quit.',
      ru: '3 месяца замещающего дохода до увольнения.',
    },
  },
  'start-fresh__has-business': {
    headline: {
      en: 'Pivot the business toward AI services',
      ru: 'Разверни бизнес в сторону AI-услуг',
    },
    intro: {
      en: 'You have a business and you want to repackage it around AI. We will show you which services to add, drop, and bundle — without breaking what works.',
      ru: 'У тебя бизнес — хочешь переупаковать его вокруг AI. Покажем, какие услуги добавить, какие убрать, как собрать пакеты — не ломая то, что уже работает.',
    },
    promise: {
      en: 'A higher-margin service line by month two.',
      ru: 'Линейка с более высокой маржой ко второму месяцу.',
    },
  },
  'start-fresh__blogger': {
    headline: {
      en: 'Reset the blog as a real business',
      ru: 'Перезапусти блог как настоящий бизнес',
    },
    intro: {
      en: 'You have a blog and want it to be a business — not a hobby. Add services, repeatable offers, and pricing that does not embarrass you.',
      ru: 'У тебя блог, хочешь, чтобы он был бизнесом, а не хобби. Добавим услуги, повторяемые офферы и цены, за которые не стыдно.',
    },
    promise: {
      en: 'Blog becomes a service business by month two.',
      ru: 'Блог становится сервисным бизнесом ко второму месяцу.',
    },
  },
};

/** Safe lookup with a graceful fallback for missing combos. */
export function getPersonalization(
  goal: GoalId | null,
  context: ContextId | null,
): Personalization {
  if (goal && context) {
    const key = `${goal}__${context}` as Key;
    const found = PERSONALIZATION[key];
    if (found) return found;
  }
  // Fallback — used only if goal/context were not selected.
  return {
    headline: {
      en: 'Your shortcut into the AI economy',
      ru: 'Твой короткий путь в AI-экономику',
    },
    intro: {
      en: 'AI Content Manager is the fastest paid skill in the AI economy — and the one that fits the widest range of starting points.',
      ru: 'AI-контент-менеджер — самый быстрый платный навык в AI-экономике и подходит почти из любой точки старта.',
    },
    promise: {
      en: 'A real working skill in 6 weeks.',
      ru: 'Реальный рабочий навык за 6 недель.',
    },
  };
}
