import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "Welcome to React": "Welcome to React and react-i18next",
            },
        },
        ja: {
            translation: {
                "Welcome to React": "React と react-i18next へようこそ",
            },
        },
        hoge: {
            translation: {
                "Welcome to React": "React と react-i18next へhogehoge",
            },
        },
    },
    lng: "hoge",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

function App() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("Welcome to React")}</h1>
        </div>
    );
}

export default App;
