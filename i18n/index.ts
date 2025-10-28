import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/common.json';
import zh from '../locales/zh/common.json';

// 仅客户端决定初始语言，避免 SSR 与 CSR 不一致
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem('LANG');
  if (saved) return saved;
  const nav = navigator?.language || navigator?.languages?.[0] || 'en';
  return nav.startsWith('zh') ? 'zh' : 'en';
};

export function ensureI18nInitialized() {
  if (i18n.isInitialized) return i18n;
  // 只在客户端初始化
  if (typeof window === 'undefined') return i18n;
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        zh: { translation: zh },
      },
      lng: getInitialLanguage(),
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      interpolation: { escapeValue: false },
      debug: false,
    });
  return i18n;
}

export function setLanguage(lang: 'en' | 'zh') {
  i18n.changeLanguage(lang);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('LANG', lang);
  }
}

export default i18n;


