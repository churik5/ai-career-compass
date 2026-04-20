/**
 * The 10-question quiz. Each option carries weights pointing at specific
 * role IDs (see `src/data/roles.ts`). Both EN and RU copy are authored.
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
          en: 'Ideas and direction — I see in my head how it should look.',
          ru: 'Идеи и режиссура — я вижу в голове, как это должно выглядеть.',
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
          en: 'Both — I both come up with ideas and make them.',
          ru: 'И то, и другое — я и придумываю, и реализовываю.',
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
          en: "Craft — I don't like thinking too much — I need a clear task: what and how.",
          ru: 'Ремесло — не люблю думать, мне нужна чёткая задача, что и как делать.',
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
          en: 'Systems — I turn chaos into a system.',
          ru: 'Системы — превращаю хаос в систему.',
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
          en: 'Many small clients — short tasks, do it and forget.',
          ru: 'Много мелких клиентов — короткие задачи, сделал и забыл.',
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
          en: 'A few clients on retainer — a few regular clients to manage.',
          ru: 'Несколько клиентов на ретейнере — несколько постоянных клиентов на ведении.',
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
          en: 'Big projects — big responsibility, but also one-off projects.',
          ru: 'Крупные проекты — большая зона ответственности, но также разовые проекты.',
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
          en: 'My own stuff — I want to grow my social media and build a brand.',
          ru: 'Свой проект — хочу развивать свои соцсети и создавать бренд.',
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
    id: 'favorite-phase',
    prompt: {
      en: 'Which part of the work energizes you most?',
      ru: 'Какая часть работы заряжает вас сильнее всего?',
    },
    options: [
      {
        id: 'idea-moment',
        label: {
          en: 'The idea — when it all clicks in my head.',
          ru: 'Идея — когда всё складывается в голове.',
        },
        weights: {
          'ai-director': 3,
          'ai-creator': 2,
          'ai-marketer': 2,
          'ai-copywriter': 1,
        },
      },
      {
        id: 'making-phase',
        label: {
          en: 'The making — hands-on, quiet, in flow.',
          ru: 'Создание — руками, тихо, в потоке.',
        },
        weights: {
          'ai-designer': 3,
          'ai-video-maker': 2,
          'ai-music-producer': 2,
          'ai-animator': 2,
          'ai-copywriter': 1,
        },
      },
      {
        id: 'launch-moment',
        label: {
          en: 'The launch — hitting publish and watching the reaction.',
          ru: 'Запуск — нажал publish и смотришь на реакцию.',
        },
        weights: {
          'ai-creator': 3,
          'ai-content-manager': 2,
          'ai-marketplace-manager': 2,
          'ai-avatar-specialist': 1,
          'ai-marketer': 1,
        },
      },
      {
        id: 'measurement-phase',
        label: {
          en: 'The numbers — seeing what actually worked.',
          ru: 'Цифры — видишь, что реально сработало.',
        },
        weights: {
          'ai-marketer': 3,
          'ai-marketplace-manager': 3,
          'ai-chatbot-specialist': 2,
          'ai-content-manager': 2,
          'ai-website-specialist': 1,
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
          en: 'Write a nice text/post.',
          ru: 'Написать красивый текст/пост.',
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
          en: 'Design a banner or image.',
          ru: 'Сделать дизайн баннера, картинки.',
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
          en: 'Write a cool song.',
          ru: 'Написать интересную песню.',
        },
        weights: {
          'ai-music-producer': 3,
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
          en: 'Facing the audience — I want to be public.',
          ru: 'Лицом к аудитории — хочу быть публичным.',
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
          en: 'I want the brand to credit me as the specialist.',
          ru: 'Хочу, чтобы бренд указывал меня как специалиста.',
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
          en: 'Behind the scenes — I make it, the brand uses it.',
          ru: 'За кулисами — я делаю, бренд использует.',
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
          en: 'Hand over the finished work and forget about it.',
          ru: 'Отдать готовую работу и забыть про неё.',
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
];
