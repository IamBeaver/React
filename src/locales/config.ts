import i18n from 'i18next';
import appEn from './en/app.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    app: appEn,
  }
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  ns: ['app'],
  interpolation: {
    escapeValue: false,
  },
  resources,
});


export default i18n;