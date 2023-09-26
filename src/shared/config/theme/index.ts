import { createEffect, createEvent, createStore, sample } from "effector";

import { appStarted } from "~/shared/init";

type Theme = "light" | "dark";

export const themeGetFx = createEffect<void, Theme>(async () => {
  try {
    const theme = localStorage.getItem("theme");

    if (theme) {
      const existedTheme = document.body.classList.contains(theme);

      if (existedTheme) {
        return theme as Theme;
      }
      document.body.classList.remove(theme === "light" ? "dark" : "light");
      document.body.classList.add(theme);
      return theme as Theme;
    }
  } catch (error) {
    throw error;
  }
  throw new Error("theme not found");
});

export const themeSetFx = createEffect<Theme, Theme>(async (theme) => {
  const bodyTheme = document.body.classList.contains(theme);

  if (bodyTheme) {
    return theme;
  }

  try {
    localStorage.setItem("theme", theme);
    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);

    return theme;
  } catch (error) {
    throw error;
  }
});

export const themeChanged = createEvent<Theme>();
export const $theme = createStore<Theme>("light");

$theme.on(themeSetFx.doneData, (_, theme) => theme);

sample({
  clock: appStarted,
  target: themeGetFx,
});

sample({
  clock: themeGetFx.doneData,
  target: themeChanged,
});

sample({
  clock: themeChanged,
  target: themeSetFx,
});
