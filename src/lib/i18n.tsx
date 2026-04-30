import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import enDict from '../locales/en.json';
import ruDict from '../locales/ru.json';

export type Lang = 'en' | 'ru';

type Dict = Record<string, unknown>;

const dicts: Record<Lang, Dict> = {
  en: enDict as Dict,
  ru: ruDict as Dict,
};

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveKey(dict: Dict, key: string): unknown {
  const parts = key.split('.');
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as object)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

function interpolate(str: string, vars: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (_match, name: string) =>
    String(vars[name] ?? `{${name}}`),
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((prev) => (prev === 'en' ? 'ru' : 'en')),
      t: (key, vars) => {
        const raw = resolveKey(dicts[lang], key);
        if (typeof raw === 'string') {
          return vars ? interpolate(raw, vars) : raw;
        }
        // fallback → EN
        if (lang !== 'en') {
          const fallback = resolveKey(dicts.en, key);
          if (typeof fallback === 'string') {
            return vars ? interpolate(fallback, vars) : fallback;
          }
        }
        return key;
      },
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}

/** Pick the current-language value from a `{en, ru}` bilingual object. */
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): <T>(obj: { en: T; ru: T }) => T {
  const { lang } = useI18n();
  return (obj) => obj[lang];
}
