import { useTranslation } from "react-i18next";

export const Test = (props: {}) => {
    const { t } = useTranslation();

    return <div>{t("test message")}</div>;
};
