// import LocalizedStrings from 'react-native-localization';
// import en from './en';
// import {TranslationModel} from './model';

// let translations = new LocalizedStrings<TranslationModel>({
//   en: en,
// });

// export default translations;

// updated translations
import { I18n } from 'i18n-js';
import en from './en';
// import { TranslationModel } from './model';

const i18n = new I18n(
  {
    en,
  },
  {
    defaultLocale: 'en',
    locale: 'en',
  },
);

// This proxy allows direct access: translations.KEY
const translations = new Proxy(i18n, {
  get(target: any, prop: string) {
    // If someone asks translations.KEY → return translated string
    if (typeof prop === 'string' && target.translations.en[prop]) {
      return target.t(prop);
    }
    return target[prop];
  },
});

export default translations;
