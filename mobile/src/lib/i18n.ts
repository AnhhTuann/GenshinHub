import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../messages/en.json';
import vi from '../messages/vi.json';
import zh from '../messages/zh.json';
import ja from '../messages/ja.json';
import ko from '../messages/ko.json';
import es from '../messages/es.json';
import fr from '../messages/fr.json';
import ru from '../messages/ru.json';
import th from '../messages/th.json';
import de from '../messages/de.json';
import id from '../messages/id.json';
import pt from '../messages/pt.json';
import it from '../messages/it.json';
import tr from '../messages/tr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      zh: { translation: zh },
      ja: { translation: ja },
      ko: { translation: ko },
      es: { translation: es },
      fr: { translation: fr },
      ru: { translation: ru },
      th: { translation: th },
      de: { translation: de },
      id: { translation: id },
      pt: { translation: pt },
      it: { translation: it },
      tr: { translation: tr },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  });

export default i18n;
