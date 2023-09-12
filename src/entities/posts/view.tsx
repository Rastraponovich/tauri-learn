import { useList, useStoreMap } from "effector-react"
import { $posts } from "./model"

export const PostList = () => {
    return (
        <div className="flex flex-col gap-2">
            {useList($posts, {
                fn: ({ id }) => <PostEntry id={id} />,
                getKey: ({ id }) => id,
            })}
        </div>
    )
}

interface PostEntryProps {
    id: number
}

const PostEntry = ({ id }: PostEntryProps) => {
    const post = useStoreMap({
        store: $posts,
        keys: [id],
        fn: (posts) => posts.find((post) => post.id === id)!,
    })

    return (
        <div className="flex flex-col p-2 shadow-md  rounded-md gap-2">
            <span>{post.title}</span>
            <span className="text-sm font-light">{post.body}</span>
        </div>
    )
}
