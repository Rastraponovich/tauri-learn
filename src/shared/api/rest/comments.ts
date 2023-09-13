import { createEffect } from "effector";

import { requestFx } from "../request";

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: Email;
  body: string;
};

export const commentsGetFx = createEffect<{ id: number }, Comment[]>(async ({ id }) => {
  const request = requestFx({
    url: `/posts/${id}/comments`,
    method: "GET",
  });

  return (await request) as Comment[];
});

export const commentCreateFx = createEffect<
  { comment: Pick<Comment, "body" | "postId" | "name"> },
  Comment
>(async ({ comment }) => {
  const request = await requestFx({
    url: `/comments`,
    method: "POST",
    body: JSON.stringify(comment),
  });
  return request as Comment;
});
