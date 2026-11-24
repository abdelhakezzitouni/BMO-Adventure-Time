// Provides language and direction.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, translations } from './translations.js';

const I18nContext = createContext(null);
const STORAGE_KEY = 'bmo-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (translations[saved]) return saved;
  } catch {
    /* Storage unavailable. */
  }
  return 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const info = LANGS.find((l) => l.code === lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = info.dir;
    document.title = translations[lang].title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* Ignore. */
    }
  }, [lang, info]);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang], dir: info.dir }), [lang, info]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

// Resolve forward and back actions.
export function useDirections() {
  const { dir } = useI18n();
  return dir === 'rtl' ? { forward: 'left', back: 'right' } : { forward: 'right', back: 'left' };
}
