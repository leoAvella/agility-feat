import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en1 from '@/locales/en-GB.json';
import es1 from '@/locales/es-ES.json';

const resources = { 
    'en-GB': { translation : en1},
    'es-ES': { translation : es1},
};
i18n.use(initReactI18next).init({
    resources,
    lng:'es-ES',
    fallbackLng: 'es-ES',
    interpolation:{
        escapeValue: false,
    }
});
export default i18n;