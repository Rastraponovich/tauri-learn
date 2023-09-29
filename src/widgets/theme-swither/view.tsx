import { useUnit } from "effector-react";

import { $theme } from "~/shared/config/theme";
import { Toggle } from "~/shared/ui/toggle";

import { themeButtonClicked } from "./model";

export const ThemeSwitcher = () => {
  const [theme, handleSetTheme] = useUnit([$theme, themeButtonClicked]);

  return (
    <div className="flex items-center">
      <Toggle
        size="lg"
        inactiveIcon="weather/sun"
        activeIcon="weather/moon-star"
        enabled={theme === "dark"}
        onChange={handleSetTheme}
        title="Theme Switcher"
        iconClassName="dark:text-blue-700 text-orange-600"
      />
    </div>
  );
};
