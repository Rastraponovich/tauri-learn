import { useList, useStoreMap, useUnit } from "effector-react";
import { type ChangeEvent, MouseEvent, useCallback } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PostCreateButton } from "~/features/posts/create";
import { PostCreateForm } from "~/features/posts/create";

import { Button } from "~/shared/ui/button";

import { $pending, $posts, limitChanged, postCardClicked, postDeleteButtonClicked } from "./model";

export const PostsPage = () => {
  const [handleLimitChanged, pending] = useUnit([limitChanged, $pending]);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleLimitChanged(+event.target.value);
  };

  return (
    <MainLayout actions={<PostCreateButton />}>
      <main className="relative flex grow flex-col  gap-10 p-8 text-center">
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
        <PostCreateForm />
      </main>
    </MainLayout>
  );
};

const PostList = () => {
  const [handleClick, onDelete] = useUnit([postCardClicked, postDeleteButtonClicked]);

  const handleDelete = useCallback((event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();

    onDelete({ id });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {useList($posts, {
        fn: ({ id }) => (
          <PostEntry
            id={id}
            onClick={() => handleClick({ id })}
            onDelete={(event) => handleDelete(event, id)}
          />
        ),
        getKey: ({ id }) => id,
      })}
    </div>
  );
};

interface PostEntryProps {
  id: number;
  onClick(): void;
  onDelete(event: MouseEvent<HTMLButtonElement>): void;
}

const PostEntry = ({ id, onClick, onDelete }: PostEntryProps) => {
  const post = useStoreMap({
    store: $posts,
    keys: [id],
    fn: (posts) => posts.find((post) => post.id === id)!,
  });

  return (
    <div className="flex flex-col gap-2 rounded-md  p-2 shadow-md" onClick={onClick}>
      <div className="flex items-center justify-between">
        <span>{post.title}</span>

        <Button onClick={onDelete}>delete</Button>
      </div>
      <span className="text-sm font-light">{post.body}</span>
    </div>
  );
};
