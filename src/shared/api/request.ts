import { createEffect } from "effector";

import { URL } from "../env";

export const requestFx = createEffect<
  {
    url: string;
    method?: string;
    query?: { _limit?: string; _page?: string; _search?: string };
  },
  unknown
>(async ({ url, method = "GET", query }) => {
  const path = `${URL}${url}${query ? `?${new URLSearchParams(query).toString()}` : ""}`;

  const res = await fetch(path, {
    method,
  });

  return await res.json();
});
