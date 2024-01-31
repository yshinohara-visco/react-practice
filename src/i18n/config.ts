import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: require('./en.json'),
    },
    ja: {
        translation: require('./ja.json'),
    },
    hoge: {
        translation: require('./hoge.json'),
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ja',
        fallbackLng: false,// フォールバックしない＝keyをそのまま表示
        returnEmptyString: false,// 空文字での定義を許可
    });

export default i18n;