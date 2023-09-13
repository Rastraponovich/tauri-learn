import clsx from "clsx";
import { useList, useStoreMap, useUnit } from "effector-react";
import { type FormEvent } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { CommentForm } from "~/features/comments/create";

import { Button } from "~/shared/ui/button";
import { TextArea } from "~/shared/ui/input";
import { Input } from "~/shared/ui/input";

import {
  $body,
  $comments,
  $commentsCount,
  $editable,
  $pending,
  $title,
  bodyChanged,
  currentRoute,
  editButtonClicked,
  fromSubmitted,
  titleChanged,
} from "./model";

export const PostPage = () => {
  const [title, body] = useUnit([$title, $body]);

  const [pending, editable] = useUnit([$pending, $editable]);

  if (pending) return <div>Loading...</div>;
  return (
    <MainLayout actions={<Actions />}>
      <main className="flex grow flex-col gap-10">
        {!editable ? (
          <section className="flex grow flex-col gap-10 p-4">
            <header className="flex flex-col gap-2">
              <h1 className="p-2 text-4xl font-bold">{title}</h1>
            </header>

            <article className="flex grow flex-col justify-between gap-2 rounded-md border p-2 shadow-lg">
              <p className="px-6 pt-6 text-2xl">{body}</p>
            </article>
            <CommentsList />
          </section>
        ) : (
          <PostForm />
        )}
      </main>
    </MainLayout>
  );
};

const PostForm = () => {
  const [body, title, handleChangeTitle, handleChangeBody, onSubmit] = useUnit([
    $body,
    $title,
    titleChanged,
    bodyChanged,
    fromSubmitted,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form id="form" className="flex grow flex-col gap-2 p-4" onSubmit={handleSubmit}>
      <Input
        value={title}
        className="text-xl font-bold"
        onValueChange={handleChangeTitle}
        label="Title"
      />

      <TextArea
        className="text-2xl shadow-lg"
        value={body}
        onValueChange={handleChangeBody}
        label="Body"
      />
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          form="form"
          className="bg-green-500 text-white shadow-md hover:bg-blue-500 hover:shadow-lg"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

const Actions = () => {
  const [editable, handleSetEditable] = useUnit([$editable, editButtonClicked]);

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        onClick={handleSetEditable}
        className={clsx(editable && "bg-blue-500 text-white")}
      >
        <span>edit</span>
      </Button>
    </div>
  );
};

const CommentsList = () => {
  const commentsCount = useUnit($commentsCount);
  const params = useUnit(currentRoute.$params) as { id: number };
  return (
    <section className="flex flex-col gap-2 p-2">
      <span className="text-base font-semibold">Comments: {commentsCount}</span>

      <div className="flex flex-col gap-1 rounded-md bg-white text-sm font-normal">
        {useList($comments, {
          fn: (comment) => <Comment id={comment.id} />,
        })}
      </div>

      <CommentForm postId={params.id} />
    </section>
  );
};

const Comment = ({ id }: { id: number }) => {
  const comment = useStoreMap({
    store: $comments,
    fn: (comments) => comments.find((comment) => comment.id === id)!,
    keys: [id],
  });

  return (
    <article className="flex flex-col gap-2 rounded-md p-2 shadow-md">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-base font-bold">{comment.name}</h2>
        <h4 className="font-light">{comment.email}</h4>
      </div>

      <p>{comment.body}</p>
    </article>
  );
};
