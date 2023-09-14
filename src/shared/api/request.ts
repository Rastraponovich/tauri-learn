import { createEffect } from "effector";

import { URL } from "../env";

export const requestFx = createEffect<
  {
    url: string;
    method?: string;
    query?: { _limit?: string; _page?: string; _search?: string };
    body?: string;
  },
  unknown
>(async ({ url, method = "GET", query, body }) => {
  const path = `${URL}${url}${query ? `?${new URLSearchParams(query).toString()}` : ""}`;

  const headers = new Headers();

  headers.set("Content-Type", "application/json; charset=UTF-8");

  const res = await fetch(path, {
    headers,
    method,
    body,
  });

  return await res.json();
});
