/**
 * Thirteen AI-enabled creator professions.
 *
 * English copy is the source of truth. Russian fields are intentionally empty
 * strings (or empty arrays for `Localized<string[]>`) — the Translator agent
 * fills them later. The shape is stable; IDs are permanent slugs.
 */

export type Localized<T = string> = { en: T; ru: T };

export type SkillName =
  | 'creativity'
  | 'visualTaste'
  | 'techSkills'
  | 'communication'
  | 'speed'
  | 'analytics'
  | 'storytelling'
  | 'systemThinking'
  | 'curation';

export type Skill = {
  key: SkillName;
  /** 0-100 */
  value: number;
};

export type Service = {
  name: Localized;
  /** USD */
  priceMin: number;
  /** USD */
  priceMax: number;
  unit: Localized;
};

export type Resource = {
  title: Localized;
  description: Localized;
  /** lucide-react icon name, e.g. "BookOpen" | "PlayCircle" | "Compass" */
  iconName: string;
};

export type AccentName = 'amber' | 'iris' | 'neon' | 'lime';

export type Role = {
  /** kebab-case, stable slug */
  id: string;
  /** lucide-react icon name */
  iconName: string;
  /** 2-stop hex gradient used on the role card */
  gradient: [string, string];
  accent: AccentName;
  name: Localized;
  /** One short punchy line (EN only — RU empty). */
  slogan: Localized;
  /** 2-3 sentences, warm tone. */
  description: Localized;
  /** 4-6 skills. */
  skills: Skill[];
  /** 4-6 short bullets. */
  whatTheyDo: Localized<string[]>;
  /** 3-5 services with price ranges. */
  services: Service[];
  /** USD range for a full-time freelancer. */
  monthlyIncome: { min: number; max: number };
  /** 3-5 starter resources. */
  resources: Resource[];
};

// Palette hexes (kept in sync with tailwind.config.js).
const AMBER = '#ff6b35';
const IRIS = '#7c6cff';
const NEON = '#22d3ee';
const LIME = '#c4f061';

export const ROLES: Role[] = [
  {
    id: 'ai-avatar-specialist',
    iconName: 'UserCircle2',
    gradient: [AMBER, IRIS],
    accent: 'amber',
    name: { en: 'AI Avatar Specialist', ru: 'Специалист по AI-аватарам' },
    slogan: {
      en: "Faces that don't exist — but pay rent.",
      ru: 'Лица, которых не существует — а аренду платят.',
    },
    description: {
      en: 'You build digital humans: virtual bloggers, synthetic founders, avatars that speak four languages before breakfast. Faces, voices, lip-sync, and a small empire of recurring clients who need a spokesperson without the drama.',
      ru: 'Вы собираете цифровых людей: виртуальных блогеров, синтетических фаундеров, аватаров, которые к завтраку говорят на четырёх языках. Лица, голоса, липсинк и небольшая империя постоянных клиентов, которым нужен спикер — без драмы и капризов.',
    },
    skills: [
      { key: 'creativity', value: 75 },
      { key: 'techSkills', value: 85 },
      { key: 'visualTaste', value: 80 },
      { key: 'storytelling', value: 65 },
      { key: 'communication', value: 60 },
    ],
    whatTheyDo: {
      en: [
        "Clones a founder's face for 12-month campaigns.",
        'Sets up lip-sync so avatars actually sound alive.',
        'Builds avatar video packs for launches and ads.',
        'Clones voices in multiple languages with clean consent.',
        'Shoots, sorts, and ships revisions fast.',
      ],
      ru: [
        'Клонирует лицо фаундера под годовую рекламную кампанию.',
        'Настраивает липсинк так, что аватар звучит живо.',
        'Собирает пакеты видео с аватарами под запуски и рекламу.',
        'Клонирует голоса на разных языках — с чистым согласием.',
        'Снимает, сортирует и быстро отдаёт правки.',
      ],
    },
    services: [
      {
        name: { en: 'Avatar creation', ru: 'Создание аватара' },
        priceMin: 400,
        priceMax: 800,
        unit: { en: 'per avatar', ru: 'за аватар' },
      },
      {
        name: { en: 'Avatar video (30s)', ru: 'Видео с аватаром (30 сек)' },
        priceMin: 50,
        priceMax: 150,
        unit: { en: 'per clip', ru: 'за ролик' },
      },
      {
        name: { en: 'Avatar + 5 videos bundle', ru: 'Аватар + 5 видео (пакет)' },
        priceMin: 700,
        priceMax: 1400,
        unit: { en: 'per bundle', ru: 'за пакет' },
      },
      {
        name: { en: 'Voice cloning pack', ru: 'Клонирование голоса (пакет)' },
        priceMin: 150,
        priceMax: 400,
        unit: { en: 'per voice', ru: 'за голос' },
      },
    ],
    monthlyIncome: { min: 2000, max: 8000 },
    resources: [
      {
        title: { en: 'HeyGen + Synthesia starter kit', ru: 'Стартовый набор HeyGen + Synthesia' },
        description: {
          en: 'Free tiers are enough to ship your first three avatars.',
          ru: 'Бесплатных тарифов хватит, чтобы выпустить первые три аватара.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Avatar walkthroughs (video series)', ru: 'Разборы аватаров (видеосерии)' },
        description: {
          en: 'Search for end-to-end avatar builds — pick one with audio you can actually stand.',
          ru: 'Ищите сборку аватара от и до — возьмите ту, где звук можно слушать без боли.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'ElevenLabs voice playbook', ru: 'Плейбук по голосам в ElevenLabs' },
        description: {
          en: 'Cloning voices without the uncanny-valley accent.',
          ru: 'Клонируем голоса без жуткого акцента из зловещей долины.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Creator Discord hubs', ru: 'Discord-хабы креаторов' },
        description: {
          en: "Find rooms where people post their day-1 avatars. That's your feedback loop.",
          ru: 'Найдите чаты, где люди выкладывают свои аватары первого дня. Это ваш фидбэк-луп.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-copywriter',
    iconName: 'PenTool',
    gradient: [IRIS, NEON],
    accent: 'iris',
    name: { en: 'AI Copywriter', ru: 'AI-копирайтер' },
    slogan: { en: 'Prompts in, pages out.', ru: 'Промпт вошёл — текст вышел.' },
    description: {
      en: 'You trade in paragraphs. Posts, emails, landing copy, tone-of-voice docs — you can draft, fix, and sharpen any of it before the coffee cools. AI does the first pass; you do the editing that makes people trust the words.',
      ru: 'Вы живёте в абзацах. Посты, письма, тексты для лендингов, документы с tone of voice — черновик, правка, огранка успевают, пока кофе не остыл. AI делает первый проход, вы — редактуру, после которой словам верят.',
    },
    skills: [
      { key: 'creativity', value: 75 },
      { key: 'storytelling', value: 85 },
      { key: 'communication', value: 80 },
      { key: 'speed', value: 75 },
      { key: 'curation', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Writes monthly content plans that actually get shipped.',
        'Rewrites tired copy until it sounds like a human again.',
        'Drafts sales pages around one clear promise.',
        'Turns founder voice notes into posts that read like the founder.',
        'Audits and polishes newsletter backlogs.',
      ],
      ru: [
        'Пишет месячные контент-планы, которые доходят до публикации.',
        'Переписывает уставший текст, пока он снова не зазвучит живо.',
        'Делает продающие страницы вокруг одного чёткого обещания.',
        'Превращает голосовые фаундера в посты, звучащие его голосом.',
        'Ревизует и полирует завалы рассылок.',
      ],
    },
    services: [
      {
        name: { en: 'Monthly content plan', ru: 'Месячный контент-план' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Social post', ru: 'Пост в соцсетях' },
        priceMin: 10,
        priceMax: 30,
        unit: { en: 'per post', ru: 'за пост' },
      },
      {
        name: { en: 'Sales page copy', ru: 'Текст для продающей страницы' },
        priceMin: 50,
        priceMax: 200,
        unit: { en: 'one-time', ru: 'разово' },
      },
      {
        name: { en: 'Email sequence (5 emails)', ru: 'Цепочка писем (5 шт.)' },
        priceMin: 80,
        priceMax: 250,
        unit: { en: 'per sequence', ru: 'за цепочку' },
      },
    ],
    monthlyIncome: { min: 1500, max: 6000 },
    resources: [
      {
        title: { en: 'Copy swipe file', ru: 'Swipe-файл любимых текстов' },
        description: {
          en: 'Collect 50 ads and emails you love. Re-read before every brief.',
          ru: 'Соберите 50 реклам и писем, которые вам нравятся. Перечитывайте перед каждым брифом.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Prompt library for writers', ru: 'Библиотека промптов для авторов' },
        description: {
          en: 'A Notion-style hub with angles, hooks, and outlines to reuse.',
          ru: 'Хаб в Notion с углами подачи, хуками и структурами, которые можно переиспользовать.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Writing-with-AI video course', ru: 'Видеокурс «Писать с AI»' },
        description: {
          en: 'Pick a free series that teaches editing, not generation.',
          ru: 'Выберите бесплатный курс, где учат редактуре, а не генерации.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Writer peer community', ru: 'Сообщество авторов' },
        description: {
          en: 'Discord rooms where people swap drafts and tear them apart kindly.',
          ru: 'Discord-чаты, где обмениваются черновиками и по-доброму разносят их в клочья.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-creator',
    iconName: 'Clapperboard',
    gradient: [AMBER, LIME],
    accent: 'amber',
    name: { en: 'AI Creator', ru: 'AI-креатор' },
    slogan: { en: 'Scrolling fuel, manufactured.', ru: 'Топливо для скролла, на потоке.' },
    description: {
      en: 'Part ideas person, part production line. You see a trend, build ten variations by lunch, and watch which ones stick. Short video, meme visuals, voiceover, thumbnail — all you, all the time.',
      ru: 'Наполовину генератор идей, наполовину конвейер. Видите тренд — к обеду уже десять вариантов, и смотрите, какие прилипнут. Короткие видео, мемные визуалы, закадровый голос, превью — всё вы и всё время.',
    },
    skills: [
      { key: 'creativity', value: 90 },
      { key: 'speed', value: 85 },
      { key: 'visualTaste', value: 75 },
      { key: 'storytelling', value: 70 },
      { key: 'curation', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Spots a trend on Monday, ships a clip by Tuesday.',
        'Builds 10 concept variations, kills the weak eight.',
        'Generates visuals, voiceovers, and edits in one sitting.',
        'Writes captions that survive the scroll.',
        'Runs a weekly retainer for small brands that want rhythm.',
      ],
      ru: [
        'В понедельник ловит тренд — во вторник уже выпускает клип.',
        'Собирает 10 концептов и безжалостно убивает восемь слабых.',
        'За один подход делает визуал, озвучку и монтаж.',
        'Пишет подписи, которые переживают скролл.',
        'Ведёт еженедельный ретейнер для небольших брендов, которым нужен ритм.',
      ],
    },
    services: [
      {
        name: { en: 'Creative clip', ru: 'Креативный ролик' },
        priceMin: 50,
        priceMax: 150,
        unit: { en: 'per clip', ru: 'за ролик' },
      },
      {
        name: { en: 'Pack of 10 videos', ru: 'Пакет из 10 видео' },
        priceMin: 400,
        priceMax: 1000,
        unit: { en: 'per pack', ru: 'за пакет' },
      },
      {
        name: { en: 'Content retainer', ru: 'Контент-ретейнер' },
        priceMin: 500,
        priceMax: 2000,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Trend audit + ideas list', ru: 'Аудит трендов + список идей' },
        priceMin: 80,
        priceMax: 200,
        unit: { en: 'one-time', ru: 'разово' },
      },
    ],
    monthlyIncome: { min: 2000, max: 8000 },
    resources: [
      {
        title: { en: 'Short-form playbook', ru: 'Плейбук по коротким видео' },
        description: {
          en: 'A plain-English guide to hooks, pacing, and payoffs.',
          ru: 'Понятный гайд по хукам, темпу и развязкам.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Trend radar feeds', ru: 'Ленты для радара трендов' },
        description: {
          en: 'Curate three accounts per platform and check them daily.',
          ru: 'Отберите по три аккаунта на каждой платформе и заходите туда ежедневно.',
        },
        iconName: 'Compass',
      },
      {
        title: { en: 'CapCut + Runway starter setup', ru: 'Стартовая связка CapCut + Runway' },
        description: {
          en: 'Free tools that cover 90 percent of what a small creator needs.',
          ru: 'Бесплатные инструменты, которые закрывают 90% задач небольшого креатора.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Creator idea bank', ru: 'Банк идей креатора' },
        description: {
          en: 'Notion template with angles, hooks, and recycle-worthy formats.',
          ru: 'Шаблон Notion с углами подачи, хуками и форматами, которые стоит переиспользовать.',
        },
        iconName: 'FileText',
      },
    ],
  },
  {
    id: 'ai-director',
    iconName: 'Film',
    gradient: [AMBER, IRIS],
    accent: 'amber',
    name: { en: 'AI Director', ru: 'AI-режиссёр' },
    slogan: { en: 'The taste behind the pixels.', ru: 'Вкус, стоящий за пикселями.' },
    description: {
      en: 'You pick the angle, you call the shots, you build the look. Other people press buttons; you decide why. Scripts, storyboards, mood boards, launch concepts — all coherent, all yours.',
      ru: 'Вы выбираете ракурс, командуете на площадке и держите весь визуальный стиль. Другие нажимают кнопки — вы решаете, зачем. Сценарии, раскадровки, мудборды, концепции запусков — всё связано, всё ваше.',
    },
    skills: [
      { key: 'storytelling', value: 90 },
      { key: 'creativity', value: 85 },
      { key: 'visualTaste', value: 80 },
      { key: 'systemThinking', value: 70 },
      { key: 'communication', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Writes scripts that carry a single idea cleanly.',
        'Boards out scenes before anyone burns a GPU.',
        'Directs style: palette, rhythm, typography, mood.',
        'Runs launch creative end-to-end with a small team.',
        'Reviews and redirects drafts without crushing morale.',
      ],
      ru: [
        'Пишет сценарии, где одна идея доносится чисто и без шума.',
        'Раскадровывает сцены до того, как кто-то сожжёт GPU.',
        'Держит стиль: палитру, ритм, типографику, настроение.',
        'Ведёт креатив под запуск от и до, с небольшой командой.',
        'Разбирает черновики и направляет без потерь в моральном духе.',
      ],
    },
    services: [
      {
        name: { en: 'Script (short-form)', ru: 'Сценарий (короткий формат)' },
        priceMin: 30,
        priceMax: 100,
        unit: { en: 'per script', ru: 'за сценарий' },
      },
      {
        name: { en: 'Project concept', ru: 'Концепция проекта' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'per concept', ru: 'за концепцию' },
      },
      {
        name: { en: 'Launch creative package', ru: 'Креативный пакет под запуск' },
        priceMin: 300,
        priceMax: 1500,
        unit: { en: 'per launch', ru: 'за запуск' },
      },
      {
        name: { en: 'Storyboard set', ru: 'Набор раскадровок' },
        priceMin: 120,
        priceMax: 400,
        unit: { en: 'per project', ru: 'за проект' },
      },
    ],
    monthlyIncome: { min: 2000, max: 9000 },
    resources: [
      {
        title: { en: 'Director\'s reading list', ru: 'Список книг режиссёра' },
        description: {
          en: 'Slim books on story structure, framing, and rhythm.',
          ru: 'Тонкие книги про структуру истории, кадрирование и ритм.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Mood-board template hub', ru: 'Хаб шаблонов мудбордов' },
        description: {
          en: 'A Figma / Notion starter so clients can actually see your idea.',
          ru: 'Стартовый набор в Figma и Notion — чтобы клиент увидел вашу идею глазами.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'AI filmmaker breakdowns', ru: 'Разборы AI-фильмов' },
        description: {
          en: 'Video essays that take a finished AI piece apart, shot by shot.',
          ru: 'Видеоэссе, которые раскладывают готовую AI-работу по кадрам.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Director community', ru: 'Сообщество режиссёров' },
        description: {
          en: 'Discord rooms where people post boards and get notes.',
          ru: 'Discord-чаты, где выкладывают раскадровки и получают фидбэк.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-chatbot-specialist',
    iconName: 'Bot',
    gradient: [IRIS, NEON],
    accent: 'iris',
    name: { en: 'AI Chatbot Specialist', ru: 'Специалист по чат-ботам' },
    slogan: { en: 'Replies while you sleep.', ru: 'Отвечает, пока вы спите.' },
    description: {
      en: 'You design conversations that close deals and calm customers. Flows, prompts, fallbacks, hand-offs to a human — wired up and running before the client finishes their onboarding form.',
      ru: 'Вы проектируете диалоги, которые закрывают сделки и успокаивают клиентов. Флоу, промпты, фолбэки, передача в руки живому человеку — всё собрано и работает ещё до того, как клиент заполнил анкету.',
    },
    skills: [
      { key: 'techSkills', value: 85 },
      { key: 'systemThinking', value: 80 },
      { key: 'communication', value: 70 },
      { key: 'analytics', value: 65 },
      { key: 'creativity', value: 55 },
    ],
    whatTheyDo: {
      en: [
        'Builds bots for lead capture, support, and light sales.',
        'Maps flows so users never hit a dead end.',
        'Writes prompts that keep the bot on brand and on topic.',
        'Wires bots into CRMs, calendars, and payment links.',
        'Runs a retainer that watches logs and trims bad replies.',
      ],
      ru: [
        'Собирает ботов под лиды, поддержку и лёгкие продажи.',
        'Рисует флоу так, что пользователь никогда не упирается в тупик.',
        'Пишет промпты, которые держат бота в бренде и по теме.',
        'Подключает ботов к CRM, календарям и платёжкам.',
        'Ведёт ретейнер: смотрит логи и режет плохие ответы.',
      ],
    },
    services: [
      {
        name: { en: 'Simple bot build', ru: 'Сборка простого бота' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'per bot', ru: 'за бота' },
      },
      {
        name: { en: 'Bot with sales funnel', ru: 'Бот с воронкой продаж' },
        priceMin: 300,
        priceMax: 800,
        unit: { en: 'per funnel', ru: 'за воронку' },
      },
      {
        name: { en: 'Support retainer', ru: 'Поддержка (ретейнер)' },
        priceMin: 50,
        priceMax: 150,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Prompt + flow audit', ru: 'Аудит промптов и флоу' },
        priceMin: 80,
        priceMax: 250,
        unit: { en: 'one-time', ru: 'разово' },
      },
    ],
    monthlyIncome: { min: 1500, max: 6000 },
    resources: [
      {
        title: { en: 'ManyChat + Voiceflow starter pack', ru: 'Стартовый набор ManyChat + Voiceflow' },
        description: {
          en: 'Free tiers cover your first three small projects easily.',
          ru: 'Бесплатных тарифов спокойно хватит на первые три небольших проекта.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Conversation design guide', ru: 'Гайд по дизайну диалогов' },
        description: {
          en: 'A short guide to writing bot turns that feel like a real person.',
          ru: 'Короткий гайд о том, как писать реплики бота, чтобы они звучали как живой человек.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Flow templates library', ru: 'Библиотека шаблонов флоу' },
        description: {
          en: 'Notion-style hub with reusable flow patterns.',
          ru: 'Хаб в Notion с переиспользуемыми паттернами диалогов.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Builder community', ru: 'Сообщество билдеров' },
        description: {
          en: 'Discord rooms where people ship bots weekly and share wins.',
          ru: 'Discord-чаты, где каждую неделю выкатывают ботов и делятся победами.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-marketplace-manager',
    iconName: 'ShoppingBag',
    gradient: [NEON, LIME],
    accent: 'neon',
    name: { en: 'AI Marketplace Manager', ru: 'Менеджер маркетплейсов с AI' },
    slogan: { en: 'Listings that climb the page.', ru: 'Карточки, которые лезут вверх в выдаче.' },
    description: {
      en: 'You live inside product cards. Titles, keywords, bullet points, infographics, competitor pricing — you test, tune, and nudge conversion up a quiet point at a time. AI does the drafts; your brain does the ranking.',
      ru: 'Вы живёте внутри карточек товара. Заголовки, ключи, буллеты, инфографика, цены конкурентов — тестируете, тюните и тихо поднимаете конверсию на пункт за пунктом. AI делает черновики, ваш мозг ранжирует.',
    },
    skills: [
      { key: 'analytics', value: 85 },
      { key: 'systemThinking', value: 75 },
      { key: 'curation', value: 70 },
      { key: 'communication', value: 65 },
      { key: 'visualTaste', value: 55 },
    ],
    whatTheyDo: {
      en: [
        'Writes product cards that actually read well on mobile.',
        'Researches keywords and back-end search terms.',
        'Generates infographics that clarify the product in two seconds.',
        'Audits competitors and flags quiet pricing opportunities.',
        'Monitors conversion and kills underperformers early.',
      ],
      ru: [
        'Пишет карточки товара, которые реально читаются с телефона.',
        'Копает ключевые слова и скрытые поисковые теги.',
        'Делает инфографику, которая объясняет товар за две секунды.',
        'Смотрит конкурентов и отмечает тихие возможности по цене.',
        'Следит за конверсией и рано снимает неудачников с полки.',
      ],
    },
    services: [
      {
        name: { en: 'Product card', ru: 'Карточка товара' },
        priceMin: 20,
        priceMax: 80,
        unit: { en: 'per card', ru: 'за карточку' },
      },
      {
        name: { en: 'Storefront build', ru: 'Сборка витрины' },
        priceMin: 200,
        priceMax: 600,
        unit: { en: 'per store', ru: 'за магазин' },
      },
      {
        name: { en: 'Marketplace retainer', ru: 'Ретейнер по маркетплейсу' },
        priceMin: 300,
        priceMax: 1200,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Competitor audit', ru: 'Аудит конкурентов' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'one-time', ru: 'разово' },
      },
    ],
    monthlyIncome: { min: 1500, max: 5000 },
    resources: [
      {
        title: { en: 'Marketplace SEO primer', ru: 'База по SEO на маркетплейсах' },
        description: {
          en: 'A short guide to titles, keywords, and back-end search terms.',
          ru: 'Короткий гайд по заголовкам, ключам и скрытым поисковым тегам.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Conversion card checklist', ru: 'Чек-лист конверсионной карточки' },
        description: {
          en: 'Notion template to QA every listing before it ships.',
          ru: 'Шаблон Notion — пройтись по нему перед публикацией каждой карточки.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Seller breakdown videos', ru: 'Видео-разборы продавцов' },
        description: {
          en: 'Teardown series of real listings — copy what works.',
          ru: 'Серия разборов реальных карточек — копируйте то, что работает.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Seller community', ru: 'Сообщество продавцов' },
        description: {
          en: 'Discord groups where sellers trade benchmarks and tool tips.',
          ru: 'Discord-группы, где продавцы делятся бенчмарками и лайфхаками по инструментам.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-designer',
    iconName: 'Palette',
    gradient: [LIME, IRIS],
    accent: 'lime',
    name: { en: 'AI Designer', ru: 'AI-дизайнер' },
    slogan: { en: 'Taste, on tap.', ru: 'Вкус на кране.' },
    description: {
      en: 'You make things beautiful and coherent. Banners, thumbnails, brand visuals, whole style systems — you generate, refine, curate, and make sure everything looks like it belongs to the same brand.',
      ru: 'Вы делаете вещи красивыми и связными. Баннеры, превью, бренд-визуалы, целые стилевые системы — генерируете, полируете, курируете и следите, чтобы всё выглядело как один бренд.',
    },
    skills: [
      { key: 'visualTaste', value: 90 },
      { key: 'creativity', value: 80 },
      { key: 'curation', value: 75 },
      { key: 'techSkills', value: 60 },
      { key: 'speed', value: 55 },
    ],
    whatTheyDo: {
      en: [
        'Generates banners and thumbnails that actually get clicks.',
        'Builds visual packs with a consistent style system.',
        'Turns moodboards into shippable image sets.',
        'Fixes AI images: faces, hands, hair, edges, the usual.',
        'Puts together simple brand kits founders can hand to anyone.',
      ],
      ru: [
        'Делает баннеры и превью, на которые реально кликают.',
        'Собирает визуальные паки с цельной стилевой системой.',
        'Превращает мудборды в готовые наборы изображений.',
        'Чинит AI-картинки: лица, руки, волосы, края — всё как обычно.',
        'Собирает простые брендбуки, которые фаундер может отдать кому угодно.',
      ],
    },
    services: [
      {
        name: { en: 'Banner design', ru: 'Дизайн баннера' },
        priceMin: 10,
        priceMax: 50,
        unit: { en: 'per banner', ru: 'за баннер' },
      },
      {
        name: { en: 'Visual pack', ru: 'Визуальный пак' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'per pack', ru: 'за пак' },
      },
      {
        name: { en: 'Project design', ru: 'Дизайн проекта' },
        priceMin: 300,
        priceMax: 1500,
        unit: { en: 'per project', ru: 'за проект' },
      },
      {
        name: { en: 'Mini brand kit', ru: 'Мини-брендбук' },
        priceMin: 200,
        priceMax: 600,
        unit: { en: 'per brand', ru: 'за бренд' },
      },
    ],
    monthlyIncome: { min: 1500, max: 6000 },
    resources: [
      {
        title: { en: 'Midjourney + Figma starter pack', ru: 'Стартовая связка Midjourney + Figma' },
        description: {
          en: 'Two tools that cover the first year of client work cleanly.',
          ru: 'Два инструмента, которые чисто закрывают первый год клиентской работы.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Style-pack template hub', ru: 'Хаб шаблонов стайл-паков' },
        description: {
          en: 'Figma and Notion templates for palettes, type, and grids.',
          ru: 'Шаблоны Figma и Notion под палитры, шрифты и сетки.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Image-gen prompt library', ru: 'Библиотека промптов для генерации' },
        description: {
          en: 'Copy-paste prompts that give you a consistent look fast.',
          ru: 'Промпты, которые можно скопировать и быстро получить цельный лук.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Designer community', ru: 'Сообщество дизайнеров' },
        description: {
          en: 'Discord rooms where people post work daily and ask for notes.',
          ru: 'Discord-чаты, где каждый день выкладывают работы и просят фидбэк.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-video-maker',
    iconName: 'Video',
    gradient: [NEON, IRIS],
    accent: 'neon',
    name: { en: 'AI Video Maker', ru: 'AI-видеомейкер' },
    slogan: { en: 'Frames, on demand.', ru: 'Кадры по запросу.' },
    description: {
      en: 'You turn a prompt into a scene. Shorts, product videos, explainer clips, effects — generated, stitched, color-graded, exported. You care about motion, cuts, and whether the eye actually has somewhere to land.',
      ru: 'Вы превращаете промпт в сцену. Шортсы, продуктовые ролики, объясняющие клипы, эффекты — сгенерировал, склеил, покрасил, экспортировал. Вам важны движение, склейки и то, за что глазу зацепиться.',
    },
    skills: [
      { key: 'visualTaste', value: 80 },
      { key: 'creativity', value: 80 },
      { key: 'techSkills', value: 75 },
      { key: 'speed', value: 70 },
      { key: 'storytelling', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Generates scenes and stitches them into a real clip.',
        'Adds effects, transitions, and sound that match the beat.',
        'Grades color so the whole piece looks like one project.',
        'Exports variants for every platform that demands its own format.',
        'Turns rough scripts into watchable 10-15 second videos fast.',
      ],
      ru: [
        'Генерирует сцены и склеивает их в настоящий клип.',
        'Добавляет эффекты, переходы и звук, попадающие в ритм.',
        'Красит цвет так, чтобы всё смотрелось одним проектом.',
        'Экспортирует варианты под каждую платформу с её капризами.',
        'Быстро превращает сырой сценарий в смотрибельное видео на 10–15 секунд.',
      ],
    },
    services: [
      {
        name: { en: 'Short video', ru: 'Короткое видео' },
        priceMin: 30,
        priceMax: 100,
        unit: { en: 'per short', ru: 'за шортс' },
      },
      {
        name: { en: '10-15 second clip', ru: 'Клип 10–15 секунд' },
        priceMin: 100,
        priceMax: 400,
        unit: { en: 'per clip', ru: 'за клип' },
      },
      {
        name: { en: 'Video pack', ru: 'Пак видео' },
        priceMin: 400,
        priceMax: 1000,
        unit: { en: 'per pack', ru: 'за пак' },
      },
      {
        name: { en: 'Style-locked retainer', ru: 'Ретейнер в едином стиле' },
        priceMin: 500,
        priceMax: 2000,
        unit: { en: 'per month', ru: '/мес.' },
      },
    ],
    monthlyIncome: { min: 2000, max: 8000 },
    resources: [
      {
        title: { en: 'Runway + Kling starter kit', ru: 'Стартовый набор Runway + Kling' },
        description: {
          en: 'Two generators that cover most real client needs today.',
          ru: 'Два генератора, которые сегодня закрывают большинство реальных клиентских задач.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'AI video breakdowns', ru: 'Разборы AI-видео' },
        description: {
          en: 'Teardown videos that show how a finished scene was built.',
          ru: 'Видео-разборы, где показывают, как собирали готовую сцену.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Editor shortcuts cheat sheet', ru: 'Шпаргалка по горячим клавишам' },
        description: {
          en: 'Learn ten CapCut/Premiere shortcuts and your speed doubles.',
          ru: 'Выучите десяток шорткатов в CapCut/Premiere — и ваша скорость удвоится.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'AI video community', ru: 'Сообщество AI-видеомейкеров' },
        description: {
          en: 'Discord rooms where people share workflows, not just outputs.',
          ru: 'Discord-чаты, где делятся пайплайнами, а не только финальными видео.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-animator',
    iconName: 'Wand2',
    gradient: [NEON, AMBER],
    accent: 'neon',
    name: { en: 'AI Animator', ru: 'AI-аниматор' },
    slogan: { en: 'Stills that start breathing.', ru: 'Статика, которая начинает дышать.' },
    description: {
      en: 'You give photos a pulse. Portraits blink, logos drift, transitions feel intentional. You know which frames deserve motion and which ones are better left alone.',
      ru: 'Вы даёте фото пульс. Портреты моргают, логотипы плывут, переходы кажутся осмысленными. Вы чувствуете, какие кадры заслуживают движения, а какие лучше оставить в покое.',
    },
    skills: [
      { key: 'visualTaste', value: 80 },
      { key: 'creativity', value: 75 },
      { key: 'techSkills', value: 75 },
      { key: 'curation', value: 65 },
      { key: 'speed', value: 60 },
    ],
    whatTheyDo: {
      en: [
        'Turns single photos into looping motion pieces.',
        'Builds scene transitions that feel composed, not glitchy.',
        'Adds subtle camera moves to flat product shots.',
        'Animates logos, titles, and lower-thirds in a consistent style.',
        'Assembles short anim packs for social feeds.',
      ],
      ru: [
        'Превращает одно фото в зацикленную анимацию.',
        'Делает переходы между сценами — собранные, без глитчей.',
        'Добавляет лёгкие движения камеры плоским продуктовым кадрам.',
        'Анимирует логотипы, тайтлы и плашки в едином стиле.',
        'Собирает короткие анимационные паки для лент в соцсетях.',
      ],
    },
    services: [
      {
        name: { en: 'Photo animation', ru: 'Анимация фото' },
        priceMin: 20,
        priceMax: 70,
        unit: { en: 'per photo', ru: 'за фото' },
      },
      {
        name: { en: 'Complex scene', ru: 'Сложная сцена' },
        priceMin: 80,
        priceMax: 200,
        unit: { en: 'per scene', ru: 'за сцену' },
      },
      {
        name: { en: 'Animation pack', ru: 'Пак анимаций' },
        priceMin: 300,
        priceMax: 800,
        unit: { en: 'per pack', ru: 'за пак' },
      },
      {
        name: { en: 'Logo / title motion kit', ru: 'Анимация логотипа и тайтлов' },
        priceMin: 120,
        priceMax: 400,
        unit: { en: 'per brand', ru: 'за бренд' },
      },
    ],
    monthlyIncome: { min: 1500, max: 6000 },
    resources: [
      {
        title: { en: 'Runway Gen + Pika starter pack', ru: 'Стартовая связка Runway Gen + Pika' },
        description: {
          en: 'Two of the friendliest motion generators for beginners.',
          ru: 'Два самых дружелюбных генератора движения для новичков.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Motion principles primer', ru: 'Основы моушена' },
        description: {
          en: 'Easing, timing, weight — small ideas that change everything.',
          ru: 'Изинг, тайминг, вес — маленькие идеи, которые меняют всё.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Animator teardowns', ru: 'Разборы аниматоров' },
        description: {
          en: 'Video breakdowns of portrait-to-motion techniques.',
          ru: 'Видео-разборы техник «из портрета в движение».',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Motion design community', ru: 'Сообщество моушен-дизайнеров' },
        description: {
          en: 'Discord rooms for AI motion and hybrid workflows.',
          ru: 'Discord-чаты по AI-моушену и гибридным пайплайнам.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-content-manager',
    iconName: 'Megaphone',
    gradient: [LIME, NEON],
    accent: 'lime',
    name: { en: 'AI Content Manager', ru: 'AI-контент-менеджер' },
    slogan: { en: 'The feed runs on your calendar.', ru: 'Лента живёт по вашему календарю.' },
    description: {
      en: 'You hold the rhythm of a channel. Planning, writing, visuals, posting, numbers, next week — you keep it all moving while other people argue about fonts. The feed never quietly dies on your watch.',
      ru: 'Вы держите ритм канала. Планирование, тексты, визуалы, публикации, цифры, следующая неделя — всё крутится, пока другие спорят о шрифтах. Лента никогда не умирает тихо на вашей смене.',
    },
    skills: [
      { key: 'systemThinking', value: 80 },
      { key: 'communication', value: 75 },
      { key: 'curation', value: 75 },
      { key: 'analytics', value: 65 },
      { key: 'storytelling', value: 60 },
    ],
    whatTheyDo: {
      en: [
        'Builds and runs a monthly content calendar.',
        'Produces post copy and visuals, or briefs the right person.',
        'Schedules, posts, and keeps comments warm.',
        'Reads analytics weekly and kills what is not working.',
        'Reports plainly to the client without burying the metric.',
      ],
      ru: [
        'Собирает и ведёт месячный контент-календарь.',
        'Делает тексты и визуалы для постов или брифует нужного человека.',
        'Планирует публикации, постит и греет комменты.',
        'Каждую неделю читает аналитику и выкидывает то, что не работает.',
        'Отчитывается клиенту по-человечески, не пряча главную метрику.',
      ],
    },
    services: [
      {
        name: { en: 'Account management', ru: 'Ведение аккаунта' },
        priceMin: 300,
        priceMax: 1000,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Content pack', ru: 'Контент-пак' },
        priceMin: 200,
        priceMax: 500,
        unit: { en: 'per pack', ru: 'за пак' },
      },
      {
        name: { en: 'Channel strategy', ru: 'Стратегия канала' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'one-time', ru: 'разово' },
      },
      {
        name: { en: 'Monthly report + next plan', ru: 'Отчёт + план на следующий месяц' },
        priceMin: 80,
        priceMax: 250,
        unit: { en: 'per month', ru: '/мес.' },
      },
    ],
    monthlyIncome: { min: 2000, max: 7000 },
    resources: [
      {
        title: { en: 'Content calendar template', ru: 'Шаблон контент-календаря' },
        description: {
          en: 'A Notion hub that schedules, tags, and reports in one place.',
          ru: 'Хаб в Notion, где в одном месте живут расписание, теги и отчётность.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Social analytics primer', ru: 'База по аналитике соцсетей' },
        description: {
          en: 'Short guide: which numbers matter, which ones lie.',
          ru: 'Короткий гайд: какие цифры важны, а какие врут.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'SMM walkthroughs', ru: 'Разборы по SMM' },
        description: {
          en: 'Free video series on channel planning and repurposing.',
          ru: 'Бесплатные видеосерии про планирование канала и переиспользование контента.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'Content manager community', ru: 'Сообщество контент-менеджеров' },
        description: {
          en: 'Discord rooms with weekly report-back threads.',
          ru: 'Discord-чаты с еженедельными ветками-отчётами.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-website-specialist',
    iconName: 'Globe',
    gradient: [IRIS, AMBER],
    accent: 'iris',
    name: { en: 'AI Website Specialist', ru: 'Специалист по AI-сайтам' },
    slogan: { en: 'A real site by Friday.', ru: 'Настоящий сайт — к пятнице.' },
    description: {
      en: 'You put landings and small sites online fast. Structure, copy, visuals, a clean mobile view — all working together, nothing left half-built. Clients send you an idea on Monday and a link to their traffic on Friday.',
      ru: 'Вы быстро выкладываете в сеть лендинги и небольшие сайты. Структура, тексты, визуалы, чистая мобильная версия — всё работает вместе, ничего не брошено на полдороги. В понедельник клиент присылает идею, в пятницу — ссылку на свой трафик.',
    },
    skills: [
      { key: 'techSkills', value: 80 },
      { key: 'systemThinking', value: 75 },
      { key: 'visualTaste', value: 70 },
      { key: 'communication', value: 65 },
      { key: 'speed', value: 70 },
    ],
    whatTheyDo: {
      en: [
        'Builds one-pager landings that load fast and read clean.',
        'Writes structure and copy before touching design.',
        'Wires forms, payments, and analytics without drama.',
        'Ships responsive layouts that actually work on phones.',
        'Runs small edits and tweaks as a low-friction retainer.',
      ],
      ru: [
        'Собирает одностраничные лендинги: быстро грузятся и чисто читаются.',
        'Сначала пишет структуру и тексты — только потом берётся за дизайн.',
        'Без драмы подключает формы, оплату и аналитику.',
        'Делает адаптивную вёрстку, которая правда работает на телефоне.',
        'Ведёт лёгкий ретейнер: мелкие правки и доработки.',
      ],
    },
    services: [
      {
        name: { en: 'Landing page', ru: 'Лендинг' },
        priceMin: 200,
        priceMax: 800,
        unit: { en: 'per page', ru: 'за страницу' },
      },
      {
        name: { en: 'Simple site (3-5 pages)', ru: 'Простой сайт (3–5 страниц)' },
        priceMin: 500,
        priceMax: 1500,
        unit: { en: 'per site', ru: 'за сайт' },
      },
      {
        name: { en: 'Edits and tweaks', ru: 'Правки и доработки' },
        priceMin: 50,
        priceMax: 200,
        unit: { en: 'per task', ru: 'за задачу' },
      },
      {
        name: { en: 'Care + updates retainer', ru: 'Поддержка и обновления (ретейнер)' },
        priceMin: 150,
        priceMax: 500,
        unit: { en: 'per month', ru: '/мес.' },
      },
    ],
    monthlyIncome: { min: 2000, max: 9000 },
    resources: [
      {
        title: { en: 'Framer + Webflow starter pack', ru: 'Стартовая связка Framer + Webflow' },
        description: {
          en: 'Two builders that cover almost any small-site brief.',
          ru: 'Два билдера, которые закрывают почти любой небольшой бриф на сайт.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Landing anatomy guide', ru: 'Гайд по анатомии лендинга' },
        description: {
          en: 'Hero, proof, offer, CTA — how to order them so the page converts.',
          ru: 'Герой, доказательства, оффер, CTA — как выстроить порядок, чтобы страница конвертировала.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Site build walkthroughs', ru: 'Пошаговая сборка сайтов' },
        description: {
          en: 'Video series that builds a full site from blank page.',
          ru: 'Видеосерии, где с пустой страницы собирают готовый сайт.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'No-code builder community', ru: 'Сообщество no-code билдеров' },
        description: {
          en: 'Discord rooms where people share tricks and broken builds.',
          ru: 'Discord-чаты, где делятся трюками и сломанными сборками.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-marketer',
    iconName: 'Target',
    gradient: [LIME, AMBER],
    accent: 'lime',
    name: { en: 'AI Marketer', ru: 'AI-маркетолог' },
    slogan: { en: 'Hypotheses, tested by Tuesday.', ru: 'Гипотезы — проверены ко вторнику.' },
    description: {
      en: 'You care about whether it works. You write a hypothesis, design the test, read the numbers, tell the truth. AI runs the drudge work — research, variants, drafts — and you make the calls that move the line.',
      ru: 'Вам важно, работает или нет. Вы формулируете гипотезу, продумываете тест, читаете цифры и говорите правду. AI берёт на себя рутину — ресёрч, варианты, черновики — а вы принимаете решения, которые двигают линию вверх.',
    },
    skills: [
      { key: 'analytics', value: 90 },
      { key: 'systemThinking', value: 85 },
      { key: 'storytelling', value: 70 },
      { key: 'communication', value: 70 },
      { key: 'creativity', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Runs market and competitor research you can actually use.',
        'Writes growth strategies with tests, not wishes.',
        'Produces creative variants and reads which ones land.',
        'Tracks funnels and calls out the leaks plainly.',
        'Reports back with numbers and a clear next move.',
      ],
      ru: [
        'Делает исследования рынка и конкурентов, которыми реально можно пользоваться.',
        'Пишет стратегии роста на тестах, а не на мечтах.',
        'Выкатывает креативные варианты и понимает, какие зашли.',
        'Смотрит воронки и честно называет места, где течёт.',
        'Отчитывается цифрами и чётким следующим шагом.',
      ],
    },
    services: [
      {
        name: { en: 'Marketing audit', ru: 'Маркетинговый аудит' },
        priceMin: 100,
        priceMax: 300,
        unit: { en: 'one-time', ru: 'разово' },
      },
      {
        name: { en: 'Growth strategy', ru: 'Стратегия роста' },
        priceMin: 300,
        priceMax: 1000,
        unit: { en: 'per strategy', ru: 'за стратегию' },
      },
      {
        name: { en: 'Growth retainer', ru: 'Ретейнер по росту' },
        priceMin: 500,
        priceMax: 3000,
        unit: { en: 'per month', ru: '/мес.' },
      },
      {
        name: { en: 'Creative test batch', ru: 'Батч креативных тестов' },
        priceMin: 200,
        priceMax: 800,
        unit: { en: 'per batch', ru: 'за батч' },
      },
    ],
    monthlyIncome: { min: 2500, max: 10000 },
    resources: [
      {
        title: { en: 'Marketer case-study playbook', ru: 'Плейбук разборов кейсов' },
        description: {
          en: 'Dissect five good campaigns before writing your own.',
          ru: 'Разберите пять хороших кампаний до того, как писать свою.',
        },
        iconName: 'Lightbulb',
      },
      {
        title: { en: 'Analytics essentials', ru: 'Основы аналитики' },
        description: {
          en: 'GA, UTM, and one spreadsheet you will open every week.',
          ru: 'GA, UTM и одна таблица, в которую вы будете заглядывать каждую неделю.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'Hypothesis template hub', ru: 'Хаб шаблонов гипотез' },
        description: {
          en: 'Notion template to structure every test the same way.',
          ru: 'Шаблон Notion, чтобы каждый тест оформлялся по одной схеме.',
        },
        iconName: 'FileText',
      },
      {
        title: { en: 'Growth marketing community', ru: 'Сообщество growth-маркетологов' },
        description: {
          en: 'Discord rooms where people post wins and, usefully, losses.',
          ru: 'Discord-чаты, где выкладывают победы и — что полезнее — провалы.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
  {
    id: 'ai-music-producer',
    iconName: 'Music4',
    gradient: [IRIS, LIME],
    accent: 'lime',
    name: { en: 'AI Music Producer', ru: 'AI-музыкальный продюсер' },
    slogan: { en: 'Tracks, mastered before lunch.', ru: 'Треки — сведены и отмастерены до обеда.' },
    description: {
      en: 'You build songs out of prompts and taste. Beats, melodies, vocals, lyrics, a clean mix — stitched together so nobody can tell which bits the model touched. Jingles for ads, background loops for channels, full tracks when the brief gets ambitious.',
      ru: 'Вы собираете песни из промптов и вкуса. Биты, мелодии, вокал, тексты, чистый микс — всё склеено так, что не разобрать, где была рука модели. Джинглы для рекламы, фоновые лупы для каналов, полноценные треки — когда бриф пошёл в амбиции.',
    },
    skills: [
      { key: 'creativity', value: 85 },
      { key: 'techSkills', value: 75 },
      { key: 'curation', value: 70 },
      { key: 'storytelling', value: 60 },
      { key: 'speed', value: 65 },
    ],
    whatTheyDo: {
      en: [
        'Generates instrumentals in a target genre and tempo.',
        'Writes and edits lyrics so they actually sing.',
        'Clones or designs vocals for hooks and verses.',
        'Mixes and masters to a loudness the client can use.',
        'Packages jingles, loops, and stingers for ads and channels.',
      ],
      ru: [
        'Генерирует инструменталы в нужном жанре и темпе.',
        'Пишет и правит тексты так, чтобы они правда пелись.',
        'Клонирует или собирает вокал под хуки и куплеты.',
        'Сводит и мастерит до громкости, с которой клиент пойдёт в работу.',
        'Упаковывает джинглы, лупы и стингеры под рекламу и каналы.',
      ],
    },
    services: [
      {
        name: { en: 'Track (instrumental)', ru: 'Трек (инструментал)' },
        priceMin: 50,
        priceMax: 300,
        unit: { en: 'per track', ru: 'за трек' },
      },
      {
        name: { en: 'Turnkey song', ru: 'Песня под ключ' },
        priceMin: 150,
        priceMax: 500,
        unit: { en: 'per song', ru: 'за песню' },
      },
      {
        name: { en: 'Jingle / stinger', ru: 'Джингл / стингер' },
        priceMin: 30,
        priceMax: 100,
        unit: { en: 'per jingle', ru: 'за джингл' },
      },
      {
        name: { en: 'Loop + stem pack', ru: 'Пак лупов и стемов' },
        priceMin: 80,
        priceMax: 250,
        unit: { en: 'per pack', ru: 'за пак' },
      },
    ],
    monthlyIncome: { min: 1500, max: 5000 },
    resources: [
      {
        title: { en: 'Suno + Udio starter kit', ru: 'Стартовый набор Suno + Udio' },
        description: {
          en: 'Two generators that cover most briefs at small budgets.',
          ru: 'Два генератора, которые закрывают большинство брифов на маленьком бюджете.',
        },
        iconName: 'Wrench',
      },
      {
        title: { en: 'Mixing basics guide', ru: 'Основы сведения' },
        description: {
          en: 'EQ, compression, loudness — the parts that actually matter.',
          ru: 'Эквалайзер, компрессия, громкость — то, что действительно важно.',
        },
        iconName: 'BookOpen',
      },
      {
        title: { en: 'AI music walkthroughs', ru: 'Разборы AI-музыки' },
        description: {
          en: 'Video series that builds a full track, from prompt to master.',
          ru: 'Видеосерии, где собирают трек целиком — от промпта до мастера.',
        },
        iconName: 'PlayCircle',
      },
      {
        title: { en: 'AI producer community', ru: 'Сообщество AI-продюсеров' },
        description: {
          en: 'Discord rooms where people post WIP tracks for feedback.',
          ru: 'Discord-чаты, где выкладывают WIP-треки на фидбэк.',
        },
        iconName: 'MessagesSquare',
      },
    ],
  },
];

export const ROLES_BY_ID: Record<string, Role> = ROLES.reduce<Record<string, Role>>(
  (acc, role) => {
    acc[role.id] = role;
    return acc;
  },
  {},
);
