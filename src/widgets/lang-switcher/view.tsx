import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import { langToggle } from "~/shared/config/i18n";

export const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const toggleLanguage = useUnit(langToggle);
  return (
    <button
      onClick={toggleLanguage}
      title={i18n.language}
      className="flex h-10 w-10 items-center justify-center rounded-md border"
    >
      {i18n.language}
    </button>
  );
};
