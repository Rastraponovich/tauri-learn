import { createHistoryRouter, createRouterControls } from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "../init";
import { notFoundRoute, routesMap } from "./routes";

export { routes } from "./routes";

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute,
  controls,
});

export const $currentPage = router.$path.map((state) => state);

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
