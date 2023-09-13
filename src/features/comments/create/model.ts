import { attach, createEvent, createStore, sample } from "effector";
import { debug } from "patronum";

import { api } from "~/shared/api";

const commentCreateFx = attach({
  effect: api.comments.commentCreateFx,
});

export const nameChanged = createEvent<string>();
export const bodyChanged = createEvent<string>();

export const formSubmitted = createEvent<{ postId: number }>();

export const $name = createStore("");
export const $body = createStore("");

$name.on(nameChanged, (_, name) => name);
$body.on(bodyChanged, (_, body) => body);

debug(nameChanged);

sample({
  clock: formSubmitted,
  source: { name: $name, body: $body },
  fn: ({ name, body }, { postId }) => ({ comment: { name, body, postId } }),
  target: commentCreateFx,
});
