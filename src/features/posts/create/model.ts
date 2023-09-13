import { attach, createEvent, createStore, sample } from "effector";
import { delay, reset } from "patronum";

import { api } from "~/shared/api";

const postCreateFx = attach({
  effect: api.posts.postCreateFx,
});

export const postCreateButtonClicked = createEvent();
export const titleChanged = createEvent<string>();
export const bodyChanged = createEvent<string>();
export const formSubmitted = createEvent();
export const closedForm = createEvent();

export const $formVisibled = createStore(false);
export const $title = createStore("");
export const $body = createStore("");

export const $status = createStore("");

$body.on(bodyChanged, (_, body) => body);
$title.on(titleChanged, (_, title) => title);

$formVisibled.on(postCreateButtonClicked, (visibled) => !visibled);

export const $pending = postCreateFx.pending;

sample({
  clock: formSubmitted,
  source: { title: $title, body: $body },
  target: postCreateFx,
});

$status.on(postCreateFx.doneData, () => "Post Created!");

reset({
  target: $status,
  clock: [titleChanged, bodyChanged, formSubmitted],
});

delay({
  source: postCreateFx.doneData,
  timeout: 3000,
  target: closedForm,
});

reset({
  clock: closedForm,
  target: [$title, $body, $formVisibled, $status],
});
