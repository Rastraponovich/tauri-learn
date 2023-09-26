import { useUnit } from "effector-react";

import { $theme } from "~/shared/config/theme";

import { themeButtonClicked } from "./model";

export const ThemeSwitcher = () => {
  const [theme, handleSetTheme] = useUnit([$theme, themeButtonClicked]);
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-md border"
      onClick={handleSetTheme}
      title={theme}
    >
      {theme}
    </button>
  );
};
