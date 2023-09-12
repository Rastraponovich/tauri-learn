import { createEffect } from "effector"

export const requestFx = createEffect<
    {
        url: string
        method?: string
        query?: { _limit?: string; _page?: string; _search?: string }
    },
    unknown
>(async ({ url, method = "GET", query }) => {
    const path = `${url}${
        query ? `?${new URLSearchParams(query).toString()}` : ""
    }`

    const res = await fetch(path, {
        method,
    })

    return await res.json()
})
