import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import { routes } from "~/shared/routing";

import { $pending, $post } from "./model";

export const PostPage = () => {
  const post = useUnit($post)!;

  const pending = useUnit($pending);

  if (pending) return <div>Loading...</div>;
  return (
    <section className="flex grow flex-col gap-10">
      <header className="flex flex-col gap-2">
        <Link to={routes.posts.posts}>Back</Link>
        <h1 className="text-4xl font-bold">{post.title}</h1>
      </header>

      <article className="flex grow flex-col gap-2 rounded-md border p-8 shadow-lg">
        <span className="text-2xl">{post.body}</span>
      </article>
    </section>
  );
};
