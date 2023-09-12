import { attach, createEffect, createStore, sample } from "effector"
import { api } from "../../shared/api"
import type { Post } from "../../shared/api/rest/posts"

const postsGetFx = attach({
    effect: api.posts.postsGetFx,
    mapParams: () => ({ limit: 10 }),
})

export const postsGet = createEffect()

export const $posts = createStore<Post[]>([])

sample({
    clock: postsGet,
    target: postsGetFx,
})

$posts.on(postsGetFx.doneData, (_, posts) => posts)
