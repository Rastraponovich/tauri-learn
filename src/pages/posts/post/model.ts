import { attach, createEvent, createStore, sample } from "effector";
import { pending, reset } from "patronum";

import { api } from "~/shared/api";
import type { Comment } from "~/shared/api/rest/comments";
import type { Post } from "~/shared/api/rest/posts";
import { routes } from "~/shared/routing";

export const currentRoute = routes.posts.post;

const postGetFx = attach({
  effect: api.posts.postGetFx,
});

const commentsGetFx = attach({
  effect: api.comments.commentsGetFx,
});

export const bodyChanged = createEvent<string>();
export const titleChanged = createEvent<string>();
export const fromSubmitted = createEvent();
export const editButtonClicked = createEvent();

export const $comments = createStore<Comment[]>([]);

export const $post = createStore<Post | null>(null);
export const $title = createStore("");
export const $body = createStore("");
export const $editable = createStore(false);

export const $commentsCount = $comments.map((comments) => comments.length);

$title.on(titleChanged, (_, title) => title);
$body.on(bodyChanged, (_, body) => body);

$editable.on(editButtonClicked, (editable) => !editable);

const postSaveFx = attach({
  effect: api.posts.postSaveFx,
  source: { title: $title, body: $body, post: $post },
  mapParams: (_, { title, body, post }) => {
    return { ...post!, title, body };
  },
});

export const $pending = pending({
  effects: [postGetFx, postSaveFx],
});

export const $commentsPending = pending({
  effects: [commentsGetFx],
});

sample({
  clock: currentRoute.opened,
  fn: (query): { id: number } => {
    return query.params as { id: number };
  },
  target: postGetFx,
});

$post.on(postGetFx.doneData, (_, post) => post);
$title.on(postGetFx.doneData, (_, post) => post.title);
$body.on(postGetFx.doneData, (_, post) => post.body);

sample({
  clock: postGetFx.doneData,
  fn: (post) => ({ id: post.id }),
  target: commentsGetFx,
});

$comments.on(commentsGetFx.doneData, (_, comments) => comments);

sample({
  clock: fromSubmitted,
  target: postSaveFx,
});

$editable.reset(postSaveFx.done);

reset({
  clock: currentRoute.closed,
  target: [$post, $title, $body, $editable],
});
