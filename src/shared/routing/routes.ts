import { type UnmappedRouteObject, createRoute } from "atomic-router";

export const routes = {
  home: createRoute(),
  posts: {
    posts: createRoute(),
    post: createRoute(),
  },
  users: {
    users: createRoute(),
    user: createRoute(),
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
  {
    path: "/users",
    route: routes.users.users,
  },
  {
    path: "/users/:id",
    route: routes.users.user,
  },
];
