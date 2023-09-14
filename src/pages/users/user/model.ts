import { attach, createEvent, createStore, sample } from "effector";
import { pending, reset } from "patronum";

import { api } from "~/shared/api";
import type { User } from "~/shared/api/rest/users";
import { routes } from "~/shared/routing";

export const currentRoute = routes.users.user;

const userGetFx = attach({
  effect: api.users.userGetFx,
});

export const emailChanged = createEvent<string>();
export const nameChanged = createEvent<string>();
export const phoneChanged = createEvent<string>();
export const formSubmitted = createEvent();
export const editButtonClicked = createEvent();

export const $user = createStore<User | null>(null);
export const $name = createStore("");
export const $email = createStore("");
export const $phone = createStore("");
export const $editable = createStore(false);

$name.on(nameChanged, (_, name) => name);
$email.on(emailChanged, (_, phone) => phone);

$editable.on(editButtonClicked, (editable) => !editable);

const userSaveFx = attach({
  effect: api.users.userSaveFx,
  source: { name: $name, email: $email, user: $user },
  mapParams: (_, { name, email, user }) => {
    const rest = user ? { ...user } : ({} as User);
    return { user: { ...rest, name, email } };
  },
});

export const $pending = pending({
  effects: [userGetFx, userSaveFx],
});

sample({
  clock: currentRoute.opened,
  fn: (query): { id: number } => {
    return query.params as { id: number };
  },
  target: userGetFx,
});

$user.on(userGetFx.doneData, (_, user) => user);
$name.on(userGetFx.doneData, (_, user) => user.name);
$email.on(userGetFx.doneData, (_, user) => user.email);
$phone.on(userGetFx.doneData, (_, user) => user.phone);

sample({
  clock: formSubmitted,
  target: userSaveFx,
});

$editable.reset(userSaveFx.done);

reset({
  clock: currentRoute.closed,
  target: [$user, $name, $email, $editable],
});
