import { createEvent, sample } from "effector";

import { $theme, themeChanged } from "~/shared/config/theme";

export const themeButtonClicked = createEvent();

sample({
  clock: themeButtonClicked,
  source: $theme,
  fn: (theme) => (theme === "dark" ? "light" : "dark"),
  target: themeChanged,
});
