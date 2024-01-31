import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: 'ja',
        fallbackLng: false,// フォールバックしない＝keyをそのまま表示
        returnEmptyString: false,// 空文字での定義を許可
    });

export default i18n;