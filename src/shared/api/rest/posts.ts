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
