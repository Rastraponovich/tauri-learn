import { PostList } from "../entities/posts"

export const Application = () => {
    return (
        <main className="container mx-auto flex flex-col gap-10 p-10 sm:p-6">
            <section className="flex flex-col gap-4">
                <PostList />
            </section>
        </main>
    )
}
