import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n"; //i18nの初期化
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
