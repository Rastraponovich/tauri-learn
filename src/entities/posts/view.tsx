import { useList, useStoreMap, useUnit } from "effector-react";

import { $posts, postGet } from "./model";

export const PostList = () => {
  const handleClick = useUnit(postGet);
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
