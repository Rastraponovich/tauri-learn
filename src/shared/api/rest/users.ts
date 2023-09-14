import { createEffect } from "effector";

import { requestFx } from "../request";

export type User = {
  id: number;
  name: string;
  username: string;
  email: Email;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: Phone;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const usersGetFx = createEffect<void, User[]>(async () => {
  const response = await requestFx({
    url: "/users",
    method: "GET",
  });

  return response as User[];
});

export const userGetFx = createEffect<{ id: number }, User>(async ({ id }) => {
  const response = await requestFx({
    url: `/users/${id}`,
    method: "GET",
  });

  return response as User;
});

export const userDeleteFx = createEffect<{ id: number }, unknown>(async ({ id }) => {
  const response = await requestFx({
    url: `/users/${id}`,
    method: "DELETE",
  });

  return response as unknown;
});

export const userSaveFx = createEffect<{ user: User }, User>(async ({ user }) => {
  const response = await requestFx({
    url: `/users/${user.id}`,
    method: "PATCH",
    body: JSON.stringify(user),
  });

  return response as User;
});

export const userCreateFx = createEffect<{ user: User }, User>(async ({ user }) => {
  const response = await requestFx({
    url: `/users`,
    method: "POST",
    body: JSON.stringify(user),
  });

  return response as User;
});
