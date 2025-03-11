import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "about": "About",
      "contact": "Contact",
      // Add more translations here
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenidos",
      "about": "Sobre Nosotros",
      "contact": "Contacto",
      // Add more translations here
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;