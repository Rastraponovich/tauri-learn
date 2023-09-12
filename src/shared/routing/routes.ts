import { type UnmappedRouteObject, createRoute } from "atomic-router";

export const routes = {
  home: createRoute(),
};

export const notFoundRoute = createRoute();

export const routesMap: UnmappedRouteObject<object>[] = [
  {
    path: "/",
    route: routes.home,
  },
];
