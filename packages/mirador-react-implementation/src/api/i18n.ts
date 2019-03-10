import de from '../locales/de/translation.json'
import en from '../locales/en/translation.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  de,
  en,
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
    lng: 'en',
    resources,
  })

export default i18n
