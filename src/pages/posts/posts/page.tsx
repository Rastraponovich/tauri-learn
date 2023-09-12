import { useList, useStoreMap, useUnit } from "effector-react";
import type { ChangeEvent } from "react";

import { $pending, $posts, limitChanged, postCardClicked } from "./model";

export const PostsPage = () => {
  const [handleLimitChanged, pending] = useUnit([limitChanged, $pending]);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleLimitChanged(+event.target.value);
  };

  return (
    <section className="flex grow flex-col gap-10  text-center">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          {pending && <div>Loading...</div>}
          <div className="grow"></div>
          <label className="flex items-center gap-2 self-end">
            <span>posts per page: </span>
            <select onChange={handleChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>

        <h1 className="text-bold text-3xl">Posts List</h1>
      </header>

      <PostList />
    </section>
  );
};

const PostList = () => {
  const handleClick = useUnit(postCardClicked);
  return (
    <div className="flex flex-col gap-2">
      {useList($posts, {
        fn: ({ id }) => <PostEntry id={id} onClick={() => handleClick({ id })} />,
        getKey: ({ id }) => id,
      })}
    </div>
  );
};

interface PostEntryProps {
  id: number;
  onClick(): void;
}

const PostEntry = ({ id, onClick }: PostEntryProps) => {
  const post = useStoreMap({
    store: $posts,
    keys: [id],
    fn: (posts) => posts.find((post) => post.id === id)!,
  });

  return (
    <div className="flex flex-col gap-2 rounded-md  p-2 shadow-md" onClick={onClick}>
      <span>{post.title}</span>
      <span className="text-sm font-light">{post.body}</span>
    </div>
  );
};
