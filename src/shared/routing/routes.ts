import { type UnmappedRouteObject, createRoute } from "atomic-router";

export const routes = {
  home: createRoute(),
  posts: {
    posts: createRoute(),
    post: createRoute(),
  },
};

export const notFoundRoute = createRoute();

export const routesMap: UnmappedRouteObject<object>[] = [
  {
    path: "/",
    route: routes.home,
  },

  {
    path: "/posts",
    route: routes.posts.posts,
  },
  {
    path: "/posts/:id",
    route: routes.posts.post,
  },
];
