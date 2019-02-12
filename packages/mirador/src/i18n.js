import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '../locales/en/translation.json';

// Load translations for each language
const resources = {
  en,
};

i18n
  .use(reactI18nextModule)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

export default i18n;
