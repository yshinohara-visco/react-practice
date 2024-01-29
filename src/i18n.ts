import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "Numの値は{{num}}です": "Num is {{num}}",
        },
    },
    ja: {
        translation: {
            "Welcome to React": "React と react-i18next へようこそ",
            "Numの値は{{num}}です": "Numの値は{{num}}です",
        },
    },
    hoge: {
        translation: {
            "Welcome to React": "React と react-i18next へhogehoge",
            "Numの値は{{num}}です": "Numの値は{{num}}hogeです",
        },
    },
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ja',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;