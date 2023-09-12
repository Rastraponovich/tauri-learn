import { attach, createEvent, createStore, sample } from "effector";

import { api } from "../../shared/api";
import type { Post } from "../../shared/api/rest/posts";

const postsGetFx = attach({
  effect: api.posts.postsGetFx,
  mapParams: () => ({ limit: 10 }),
});

const postGetFx = attach({
  effect: api.posts.postGetFx,
});

export const postsGet = createEvent();

export const postGet = createEvent<{ id: number }>();

export const $posts = createStore<Post[]>([]);

sample({
  clock: postsGet,
  target: postsGetFx,
});

$posts.on(postsGetFx.doneData, (_, posts) => posts);

sample({
  clock: postGet,
  target: postGetFx,
});
