import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/common.json';
import zh from '../locales/zh/common.json';

// 获取保存的语言
export const getCurrentLanguage = (): string => {
  if (typeof window === 'undefined') return 'en'; // 服务端返回默认值
  
  return localStorage.getItem('i18nextLng') || 'en';
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
      lng: getCurrentLanguage(),
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      interpolation: { escapeValue: false },
      debug: false,
    });
  return i18n;
}

// 设置语言
export const setLanguage = (lang: string) => {
  localStorage.setItem('i18nextLng', lang);
  return i18n.changeLanguage(lang);
};

export default i18n;


