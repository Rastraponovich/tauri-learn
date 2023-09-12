import { attach, createEvent, createStore, sample } from "effector";
import { debug } from "patronum";

import { api } from "~/shared/api";
import { Post } from "~/shared/api/rest/posts";
import { routes } from "~/shared/routing";

export const currentRoute = routes.posts.posts;

export const limitChanged = createEvent<number>();

debug(limitChanged);
export const postsGet = createEvent();
export const postCardClicked = createEvent<{ id: number }>();

export const $posts = createStore<Post[]>([]);

export const $limit = createStore(10);

$limit.on(limitChanged, (_, limit) => limit);

const postsGetFx = attach({
  effect: api.posts.postsGetFx,
  source: { limit: $limit },

  mapParams: (_, { limit }) => ({ limit }),
});

export const $pending = postsGetFx.pending;

sample({
  clock: currentRoute.opened,
  target: postsGet,
});

sample({
  clock: [postsGet, $limit],
  target: postsGetFx,
});

$posts.on(postsGetFx.doneData, (_, posts) => posts);

sample({
  clock: postCardClicked,
  target: routes.posts.post.open,
});
