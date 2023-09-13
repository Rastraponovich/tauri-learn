import { attach, combine, createEvent, createStore, sample } from "effector";

import { api } from "~/shared/api";

const commentCreateFx = attach({
  effect: api.comments.commentCreateFx,
});

export const nameChanged = createEvent<string>();
export const bodyChanged = createEvent<string>();

export const formSubmitted = createEvent<{ postId: number }>();

export const $name = createStore("");
export const $body = createStore("");

const $comment = combine({
  name: $name,
  body: $body,
  email: "Hayden@althea.biz",
});

$name.on(nameChanged, (_, name) => name);
$body.on(bodyChanged, (_, body) => body);

sample({
  clock: formSubmitted,
  source: { comment: $comment },
  fn: ({ comment }, { postId }) => ({ comment: { ...comment, postId } }),
  target: commentCreateFx,
});
