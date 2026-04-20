/**
 * The 12-question quiz. Each option carries weights pointing at specific
 * role IDs (see `src/data/roles.ts`). English copy is the source of truth;
 * Russian fields are empty strings — the Translator agent fills them later.
 */

export type Localized = { en: string; ru: string };

/** role-id → points, typically 1-3. Not every role must appear in every option. */
export type OptionWeights = Partial<Record<string, number>>;

export type Option = {
  /** short stable key within the question */
  id: string;
  label: Localized;
  weights: OptionWeights;
};

export type Question = {
  /** stable slug */
  id: string;
  prompt: Localized;
  hint?: Localized;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: 'medium',
    prompt: {
      en: 'Which medium gives you the most energy?',
      ru: 'Какая среда даёт вам больше всего энергии?',
    },
    hint: {
      en: 'Pick the one you could do for hours without noticing.',
      ru: 'Выберите то, чем могли бы заниматься часами и не заметить.',
    },
    options: [
      {
        id: 'text',
        label: { en: 'Words on a page — writing, editing, reshaping.', ru: 'Слова на странице — писать, редактировать, перекраивать.' },
        weights: {
          'ai-copywriter': 3,
          'ai-director': 2,
          'ai-chatbot-specialist': 2,
          'ai-marketer': 1,
        },
      },
      {
        id: 'image',
        label: { en: 'Images — frames, palettes, composition.', ru: 'Изображения — кадры, палитры, композиция.' },
        weights: {
          'ai-designer': 3,
          'ai-animator': 2,
          'ai-avatar-specialist': 1,
          'ai-creator': 1,
        },
      },
      {
        id: 'video',
        label: { en: 'Video — scenes, cuts, motion, flow.', ru: 'Видео — сцены, склейки, движение, течение.' },
        weights: {
          'ai-video-maker': 3,
          'ai-creator': 2,
          'ai-director': 2,
          'ai-animator': 2,
        },
      },
      {
        id: 'audio',
        label: { en: 'Sound — music, voice, rhythm.', ru: 'Звук — музыка, голос, ритм.' },
        weights: {
          'ai-music-producer': 3,
          'ai-avatar-specialist': 1,
        },
      },
    ],
  },
  {
    id: 'ideas-vs-execution',
    prompt: {
      en: 'Ideas or execution — where do you actually add the most value?',
      ru: 'Идеи или исполнение — где вы реально добавляете больше всего ценности?',
    },
    options: [
      {
        id: 'pure-ideas',
        label: {
          en: 'Ideas and direction — I see the angle and I brief the team.',
          ru: 'Идеи и режиссура — я вижу угол подачи и брифую команду.',
        },
        weights: {
          'ai-director': 3,
          'ai-marketer': 2,
          'ai-creator': 1,
        },
      },
      {
        id: 'idea-execution-mix',
        label: {
          en: 'Both — I come up with it and I ship it.',
          ru: 'И то, и другое — я придумываю и сам же выкатываю.',
        },
        weights: {
          'ai-creator': 3,
          'ai-copywriter': 2,
          'ai-designer': 2,
          'ai-music-producer': 1,
        },
      },
      {
        id: 'craft-first',
        label: {
          en: 'Craft — give me the brief, I will make it beautiful.',
          ru: 'Ремесло — дайте бриф, а дальше я сделаю красиво.',
        },
        weights: {
          'ai-designer': 3,
          'ai-video-maker': 2,
          'ai-animator': 2,
          'ai-avatar-specialist': 1,
        },
      },
      {
        id: 'delivery-systems',
        label: {
          en: 'Systems — turning a mess into something that ships weekly.',
          ru: 'Системы — превращаю хаос во что-то, что выходит каждую неделю.',
        },
        weights: {
          'ai-content-manager': 3,
          'ai-chatbot-specialist': 2,
          'ai-marketplace-manager': 2,
          'ai-website-specialist': 1,
        },
      },
    ],
  },
  {
    id: 'client-mode',
    prompt: {
      en: 'How do you prefer to work with clients?',
      ru: 'Как вам удобнее работать с клиентами?',
    },
    options: [
      {
        id: 'many-clients',
        label: {
          en: 'Many small clients — quick jobs, clear scope, fast turnaround.',
          ru: 'Много мелких клиентов — быстрые задачи, чёткий скоуп, короткий цикл.',
        },
        weights: {
          'ai-designer': 2,
          'ai-animator': 2,
          'ai-marketplace-manager': 2,
          'ai-copywriter': 2,
          'ai-music-producer': 1,
        },
      },
      {
        id: 'few-retainers',
        label: {
          en: 'A few clients on retainer — know the brand, run the feed.',
          ru: 'Несколько клиентов на ретейнере — знать бренд, вести ленту.',
        },
        weights: {
          'ai-content-manager': 3,
          'ai-marketer': 2,
          'ai-chatbot-specialist': 1,
          'ai-website-specialist': 1,
        },
      },
      {
        id: 'project-based',
        label: {
          en: 'Big projects — scoped, defined, delivered, next.',
          ru: 'Крупные проекты — скоуп, сроки, сдача, следующий.',
        },
        weights: {
          'ai-director': 3,
          'ai-website-specialist': 2,
          'ai-avatar-specialist': 2,
          'ai-video-maker': 1,
        },
      },
      {
        id: 'own-projects',
        label: {
          en: 'My own stuff — I would rather build an audience than invoice.',
          ru: 'Свой проект — лучше растить аудиторию, чем выставлять счета.',
        },
        weights: {
          'ai-creator': 3,
          'ai-music-producer': 2,
          'ai-copywriter': 1,
          'ai-designer': 1,
        },
      },
    ],
  },
  {
    id: 'speed-vs-depth',
    prompt: {
      en: 'Speed or depth — how do you like to work?',
      ru: 'Скорость или глубина — как вам нравится работать?',
    },
    options: [
      {
        id: 'shipper',
        label: {
          en: 'Fast — five rough drafts beats one late perfect one.',
          ru: 'Быстро — пять сырых черновиков лучше одного идеального, но с опозданием.',
        },
        weights: {
          'ai-creator': 3,
          'ai-copywriter': 2,
          'ai-content-manager': 2,
          'ai-video-maker': 1,
        },
      },
      {
        id: 'balanced',
        label: {
          en: 'Balanced — quick where I can, careful where it matters.',
          ru: 'Баланс — быстро там, где можно, аккуратно там, где важно.',
        },
        weights: {
          'ai-marketplace-manager': 2,
          'ai-designer': 2,
          'ai-website-specialist': 2,
          'ai-animator': 1,
          'ai-marketer': 1,
        },
      },
      {
        id: 'deep-craft',
        label: {
          en: 'Deep — one thing, finished right, end to end.',
          ru: 'Глубоко — одна вещь, доведённая до ума, от и до.',
        },
        weights: {
          'ai-director': 3,
          'ai-avatar-specialist': 2,
          'ai-music-producer': 2,
          'ai-video-maker': 1,
        },
      },
      {
        id: 'meticulous',
        label: {
          en: 'Meticulous — I want every number and every edge to line up.',
          ru: 'Дотошно — хочу, чтобы каждая цифра и каждый край сходились.',
        },
        weights: {
          'ai-marketer': 3,
          'ai-chatbot-specialist': 2,
          'ai-marketplace-manager': 2,
          'ai-website-specialist': 1,
        },
      },
    ],
  },
  {
    id: 'numbers-vs-aesthetics',
    prompt: {
      en: 'Data dashboards or a perfect frame — which one keeps you up?',
      ru: 'Дашборды с цифрами или идеальный кадр — от чего у вас не спится?',
    },
    options: [
      {
        id: 'numbers',
        label: {
          en: 'Numbers. Charts, funnels, conversion curves.',
          ru: 'Цифры. Графики, воронки, кривые конверсии.',
        },
        weights: {
          'ai-marketer': 3,
          'ai-marketplace-manager': 3,
          'ai-content-manager': 1,
          'ai-chatbot-specialist': 1,
        },
      },
      {
        id: 'systems',
        label: {
          en: 'Systems. How a thing is wired to keep working.',
          ru: 'Системы. То, как штука собрана, чтобы продолжала работать.',
        },
        weights: {
          'ai-chatbot-specialist': 3,
          'ai-website-specialist': 2,
          'ai-content-manager': 2,
          'ai-marketer': 1,
        },
      },
      {
        id: 'aesthetics',
        label: {
          en: 'Aesthetics. A palette, a line of type, a frame that lands.',
          ru: 'Эстетика. Палитра, строка шрифта, кадр, который попадает.',
        },
        weights: {
          'ai-designer': 3,
          'ai-director': 2,
          'ai-animator': 2,
          'ai-avatar-specialist': 1,
        },
      },
      {
        id: 'craft-output',
        label: {
          en: 'The finished piece. A track, a clip, a scene that works.',
          ru: 'Готовая вещь. Трек, клип, сцена, которая работает.',
        },
        weights: {
          'ai-music-producer': 3,
          'ai-video-maker': 2,
          'ai-creator': 2,
          'ai-copywriter': 1,
        },
      },
    ],
  },
  {
    id: 'tinkering',
    prompt: {
      en: 'How do you feel about tinkering with tools, APIs, and settings?',
      ru: 'Как вам копаться в инструментах, API и настройках?',
    },
    options: [
      {
        id: 'love-it',
        label: {
          en: 'Love it — I want to know how the machine actually works.',
          ru: 'Обожаю — хочу понимать, как эта машина устроена изнутри.',
        },
        weights: {
          'ai-chatbot-specialist': 3,
          'ai-website-specialist': 3,
          'ai-video-maker': 2,
          'ai-avatar-specialist': 2,
        },
      },
      {
        id: 'curious-enough',
        label: {
          en: 'Curious enough — I will learn the tools that pay.',
          ru: 'Достаточно любопытно — выучу инструменты, которые приносят деньги.',
        },
        weights: {
          'ai-designer': 2,
          'ai-animator': 2,
          'ai-marketplace-manager': 2,
          'ai-music-producer': 2,
          'ai-content-manager': 1,
        },
      },
      {
        id: 'use-and-go',
        label: {
          en: 'I use tools, I do not marry them — give me the output.',
          ru: 'Я пользуюсь инструментами, а не живу с ними — мне нужен результат.',
        },
        weights: {
          'ai-creator': 3,
          'ai-copywriter': 2,
          'ai-marketer': 1,
        },
      },
      {
        id: 'leave-me-alone',
        label: {
          en: 'Honestly, settings bore me. Put me on the creative side.',
          ru: 'Честно — настройки скучны. Отправьте меня на креативную сторону.',
        },
        weights: {
          'ai-director': 3,
          'ai-copywriter': 1,
          'ai-music-producer': 1,
          'ai-designer': 1,
        },
      },
    ],
  },
  {
    id: 'engagement-length',
    prompt: {
      en: 'What kind of engagement sounds like fun and not a trap?',
      ru: 'Какой формат сотрудничества кажется интересным, а не ловушкой?',
    },
    options: [
      {
        id: 'one-off',
        label: {
          en: 'One-offs — in, done, invoice, next.',
          ru: 'Разовые заказы — зашёл, сделал, выставил счёт, дальше.',
        },
        weights: {
          'ai-designer': 2,
          'ai-animator': 2,
          'ai-music-producer': 2,
          'ai-copywriter': 1,
        },
      },
      {
        id: 'short-projects',
        label: {
          en: 'Short projects with a clear goal and a launch date.',
          ru: 'Короткие проекты с чёткой целью и датой запуска.',
        },
        weights: {
          'ai-director': 3,
          'ai-video-maker': 2,
          'ai-avatar-specialist': 2,
          'ai-website-specialist': 2,
        },
      },
      {
        id: 'retainers',
        label: {
          en: 'Monthly retainers — same client, growing work.',
          ru: 'Месячные ретейнеры — тот же клиент, объём работы растёт.',
        },
        weights: {
          'ai-content-manager': 3,
          'ai-marketer': 3,
          'ai-marketplace-manager': 2,
          'ai-chatbot-specialist': 2,
        },
      },
      {
        id: 'own-brand',
        label: {
          en: 'Running my own thing — a channel, a product, a small shop.',
          ru: 'Своё дело — канал, продукт, маленький магазин.',
        },
        weights: {
          'ai-creator': 3,
          'ai-music-producer': 2,
          'ai-copywriter': 1,
          'ai-designer': 1,
        },
      },
    ],
  },
  {
    id: 'craft-subtype',
    prompt: {
      en: 'Pick the thing you would happily do for free on a Saturday.',
      ru: 'Выберите то, что с удовольствием сделаете бесплатно в субботу.',
    },
    options: [
      {
        id: 'voice',
        label: {
          en: 'Rewrite a weak piece of copy until it sings.',
          ru: 'Переписать слабый текст до тех пор, пока он не зазвучит.',
        },
        weights: {
          'ai-copywriter': 3,
          'ai-director': 2,
          'ai-content-manager': 1,
          'ai-marketer': 1,
        },
      },
      {
        id: 'visual',
        label: {
          en: 'Design a poster, a thumbnail, a visual pack.',
          ru: 'Сверстать постер, превью, визуальный пак.',
        },
        weights: {
          'ai-designer': 3,
          'ai-avatar-specialist': 1,
          'ai-marketplace-manager': 1,
          'ai-website-specialist': 1,
        },
      },
      {
        id: 'motion',
        label: {
          en: 'Cut a 15-second clip that people actually finish watching.',
          ru: 'Смонтировать 15-секундный клип, который досматривают до конца.',
        },
        weights: {
          'ai-video-maker': 3,
          'ai-animator': 2,
          'ai-creator': 2,
          'ai-avatar-specialist': 1,
        },
      },
      {
        id: 'sound',
        label: {
          en: 'Build a short track or a jingle someone can ship as an ad.',
          ru: 'Собрать короткий трек или джингл, который можно пустить в рекламу.',
        },
        weights: {
          'ai-music-producer': 3,
        },
      },
    ],
  },
  {
    id: 'planning-style',
    prompt: {
      en: 'How do you handle a blank week and five deliverables?',
      ru: 'Как вы заходите в пустую неделю с пятью задачами?',
    },
    options: [
      {
        id: 'calendar-first',
        label: {
          en: 'Calendar first — slots, checklists, a clean Monday.',
          ru: 'Сначала календарь — слоты, чек-листы, чистый понедельник.',
        },
        weights: {
          'ai-content-manager': 3,
          'ai-marketer': 2,
          'ai-marketplace-manager': 2,
          'ai-website-specialist': 1,
        },
      },
      {
        id: 'priorities-first',
        label: {
          en: 'Two priorities, everything else negotiable.',
          ru: 'Два приоритета — всё остальное обсуждаемо.',
        },
        weights: {
          'ai-director': 3,
          'ai-chatbot-specialist': 2,
          'ai-avatar-specialist': 1,
          'ai-website-specialist': 1,
        },
      },
      {
        id: 'batch-mode',
        label: {
          en: 'Batch it — three deep sessions, done.',
          ru: 'Батчами — три глубоких захода и всё.',
        },
        weights: {
          'ai-designer': 2,
          'ai-video-maker': 2,
          'ai-music-producer': 2,
          'ai-animator': 2,
          'ai-copywriter': 1,
        },
      },
      {
        id: 'spark-first',
        label: {
          en: 'Follow the spark — I do my best work when I am in it.',
          ru: 'За искрой — лучше всего работаю, когда меня несёт.',
        },
        weights: {
          'ai-creator': 3,
          'ai-copywriter': 1,
          'ai-director': 1,
          'ai-music-producer': 1,
        },
      },
    ],
  },
  {
    id: 'audience',
    prompt: {
      en: 'On-camera or off-camera — where do you want to live?',
      ru: 'В кадре или за кадром — где вам комфортнее жить?',
    },
    options: [
      {
        id: 'on-camera',
        label: {
          en: 'Facing the audience — I want my own feed.',
          ru: 'Лицом к аудитории — хочу свою ленту.',
        },
        weights: {
          'ai-creator': 3,
          'ai-content-manager': 2,
          'ai-copywriter': 1,
        },
      },
      {
        id: 'voice-of',
        label: {
          en: 'Voice behind the brand — I shape it, they take the credit.',
          ru: 'Голос за брендом — я придаю ему форму, лавры достаются им.',
        },
        weights: {
          'ai-copywriter': 3,
          'ai-director': 2,
          'ai-content-manager': 2,
          'ai-marketer': 1,
        },
      },
      {
        id: 'behind-scenes-build',
        label: {
          en: 'Behind the scenes — I build the thing, you ship it.',
          ru: 'За кулисами — я собираю, вы выкатываете.',
        },
        weights: {
          'ai-chatbot-specialist': 3,
          'ai-website-specialist': 3,
          'ai-avatar-specialist': 2,
          'ai-animator': 1,
        },
      },
      {
        id: 'deliver-and-done',
        label: {
          en: 'Deliver the file and log off — the client handles the posting.',
          ru: 'Сдать файл и выйти из чата — пусть клиент сам постит.',
        },
        weights: {
          'ai-designer': 2,
          'ai-video-maker': 2,
          'ai-music-producer': 2,
          'ai-marketplace-manager': 1,
          'ai-animator': 1,
        },
      },
    ],
  },
  {
    id: 'structure-vs-improv',
    prompt: {
      en: 'Structure or improv — how do you actually get to a good result?',
      ru: 'Структура или импровизация — как вы реально приходите к хорошему результату?',
    },
    options: [
      {
        id: 'tight-structure',
        label: {
          en: 'Tight structure — brief, outline, execute, done.',
          ru: 'Жёсткая структура — бриф, план, исполнение, готово.',
        },
        weights: {
          'ai-website-specialist': 3,
          'ai-marketplace-manager': 2,
          'ai-marketer': 2,
          'ai-chatbot-specialist': 2,
        },
      },
      {
        id: 'structured-flexibility',
        label: {
          en: 'Structure with room — a plan I can bend on the day.',
          ru: 'Структура с запасом — план, который можно согнуть по ходу.',
        },
        weights: {
          'ai-content-manager': 2,
          'ai-director': 2,
          'ai-avatar-specialist': 2,
          'ai-copywriter': 1,
          'ai-animator': 1,
        },
      },
      {
        id: 'loose-improv',
        label: {
          en: 'Loose — I riff, cut, retry, riff again.',
          ru: 'Свободно — импровизирую, режу, пробую снова, импровизирую снова.',
        },
        weights: {
          'ai-creator': 3,
          'ai-music-producer': 2,
          'ai-video-maker': 2,
          'ai-designer': 1,
        },
      },
      {
        id: 'chaos-pro',
        label: {
          en: 'Chaos, but I land it — give me a deadline and get out of the way.',
          ru: 'Хаос, но я дотягиваю — дайте дедлайн и отойдите.',
        },
        weights: {
          'ai-creator': 2,
          'ai-director': 2,
          'ai-copywriter': 2,
          'ai-music-producer': 1,
        },
      },
    ],
  },
  {
    id: 'prompting-comfort',
    prompt: {
      en: 'How comfortable are you jumping between ten AI tools in a day?',
      ru: 'Насколько легко вам прыгать между десятью AI-инструментами за день?',
    },
    options: [
      {
        id: 'native',
        label: {
          en: 'Native — I try the new one the day it drops.',
          ru: 'Как рыба в воде — новый инструмент пробую в день релиза.',
        },
        weights: {
          'ai-video-maker': 3,
          'ai-avatar-specialist': 2,
          'ai-animator': 2,
          'ai-music-producer': 2,
          'ai-chatbot-specialist': 1,
        },
      },
      {
        id: 'confident',
        label: {
          en: 'Confident — give me an afternoon and I will have it figured.',
          ru: 'Уверенно — дайте полдня, и я разберусь.',
        },
        weights: {
          'ai-designer': 2,
          'ai-website-specialist': 2,
          'ai-marketplace-manager': 2,
          'ai-creator': 2,
          'ai-marketer': 1,
        },
      },
      {
        id: 'prefer-few',
        label: {
          en: 'Prefer to go deep in two or three tools I actually know.',
          ru: 'Предпочитаю копать вглубь в двух-трёх инструментах, которые знаю.',
        },
        weights: {
          'ai-director': 2,
          'ai-copywriter': 3,
          'ai-content-manager': 2,
          'ai-marketer': 2,
        },
      },
      {
        id: 'tools-as-means',
        label: {
          en: 'Tools are a means — the idea is the thing.',
          ru: 'Инструменты — всего лишь средство, главное — идея.',
        },
        weights: {
          'ai-director': 2,
          'ai-creator': 1,
          'ai-copywriter': 1,
          'ai-marketer': 1,
        },
      },
    ],
  },
];
