import { attach, createEvent, createStore, sample } from "effector";

import { api } from "~/shared/api";
import { User } from "~/shared/api/rest/users";
import { routes } from "~/shared/routing";

export const currentRoute = routes.users.users;

const userDeleteFx = attach({
  effect: api.users.userDeleteFx,
});

export const limitChanged = createEvent<number>();

export const usersGet = createEvent();
export const userCardClicked = createEvent<{ id: number }>();
export const userDeleteButtonClicked = createEvent<{ id: number }>();

export const $users = createStore<User[]>([]);

export const $limit = createStore(10);

$limit.on(limitChanged, (_, limit) => limit);

const usersGetFx = attach({
  effect: api.users.usersGetFx,
  source: { limit: $limit },

  mapParams: (_, { limit }) => ({ limit }),
});

export const $pending = usersGetFx.pending;

sample({
  clock: currentRoute.opened,
  target: usersGet,
});

sample({
  clock: [usersGet, $limit, userDeleteFx.done],
  target: usersGetFx,
});

$users.on(usersGetFx.doneData, (_, posts) => posts);

sample({
  clock: userCardClicked,
  target: routes.users.user.open,
});

sample({
  clock: userDeleteButtonClicked,
  target: userDeleteFx,
});
