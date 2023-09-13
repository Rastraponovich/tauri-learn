import { createEffect } from "effector";

import { requestFx } from "../request";

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export const postsGetFx = createEffect<{ limit?: number }, Post[]>(async ({ limit = 10 }) => {
  const response = await requestFx({
    url: "/posts",
    query: { _limit: limit.toString() },
  });

  return response as Post[];
});

export const postGetFx = createEffect<{ id: number }, Post>(async ({ id }) => {
  const response = await requestFx({
    url: `/posts/${id}`,
  });

  return response as Post;
});

export const postSaveFx = createEffect<Post, Post>(async (post) => {
  const response = await requestFx({
    url: "/posts",
    method: "POST",
    body: JSON.stringify(post),
  });

  return response as Post;
});

export const postCreateFx = createEffect<{ title: string; body: string }, Post>(
  async ({ title, body }) => {
    const response = await requestFx({
      url: "/posts",
      method: "POST",
      body: JSON.stringify({ title, body }),
    });

    return response as Post;
  },
);

export const postDeleteFx = createEffect<{ id: number }, void>(async ({ id }) => {
  await requestFx({
    url: `/posts/${id}`,
    method: "DELETE",
  });
});
