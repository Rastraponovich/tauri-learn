import { attach, createStore, sample } from "effector";
import { reset } from "patronum";

import { api } from "~/shared/api";
import { Post } from "~/shared/api/rest/posts";
import { routes } from "~/shared/routing";

export const currentRoute = routes.posts.post;

const postGetFx = attach({
  effect: api.posts.postGetFx,
});

export const $post = createStore<Post | null>(null);

sample({
  clock: currentRoute.opened,
  fn: (query): { id: number } => {
    return query.params as { id: number };
  },
  target: postGetFx,
});

export const $pending = postGetFx.pending;

$post.on(postGetFx.doneData, (_, post) => post);

reset({
  clock: currentRoute.closed,
  target: [$post],
});
