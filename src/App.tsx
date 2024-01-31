import React from "react";
import { useTranslation } from "react-i18next";
import { Test } from "./components/test";

function App() {
    const { t, i18n } = useTranslation();
    const [num, setNum] = React.useState(0);

    return (
        <div>
            <h1>{t("Welcome to React")}</h1>
            <h2>
                {t("Numの値は{{num}}です", {
                    num,
                })}
            </h2>
            <Test />
            <button
                onClick={() => {
                    i18n.changeLanguage("en");
                }}
            >
                en
            </button>
            <button
                onClick={() => {
                    i18n.changeLanguage("ja");
                }}
            >
                ja
            </button>
            <button
                onClick={() => {
                    i18n.changeLanguage("hoge");
                }}
            >
                hoge
            </button>
            <button onClick={() => setNum(num + 1)}>+</button>
        </div>
    );
}

export default App;
