import { useUnit } from "effector-react";
import { FormEventHandler } from "react";

import { Button } from "~/shared/ui/button";
import { Input, TextArea } from "~/shared/ui/input";

import {
  $body,
  $formVisibled,
  $pending,
  $status,
  $title,
  bodyChanged,
  closedForm,
  formSubmitted,
  postCreateButtonClicked,
  titleChanged,
} from "./model";

export const PostCreateButton = () => {
  const handleClick = useUnit(postCreateButtonClicked);
  return <Button onClick={handleClick}>Create post</Button>;
};

export const PostCreateForm = () => {
  const [visibled, handleReset, onSubmit, pending, message] = useUnit([
    $formVisibled,
    closedForm,
    formSubmitted,
    $pending,
    $status,
  ]);

  if (!visibled) return null;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="absolute inset-0 flex flex-col items-center  p-10"
    >
      <div className="absolute inset-0 z-30 bg-black/30"></div>
      <div className="relative z-50 flex w-full max-w-lg flex-col gap-10 rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-2xl">Create Post</h2>
          <div className="flex flex-col font-normal">
            {pending && <span>Try to create...</span>}
            {message && <p>{message}</p>}
          </div>
        </div>
        <TitleFiled />
        <BodyField />
        <div className="flex items-center justify-end gap-4">
          <CloseButton />
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};

const CloseButton = () => {
  const pending = useUnit($pending);
  return (
    <Button type="reset" pending={pending} className="hover:bg-rose-600 hover:text-white">
      Close
    </Button>
  );
};

const SubmitButton = () => {
  const pending = useUnit($pending);

  return (
    <Button type="submit" pending={pending} className="hover:bg-green-600 hover:text-white">
      Submit
    </Button>
  );
};

const BodyField = () => {
  const [pending, body, handleBodyChange] = useUnit([$pending, $body, bodyChanged]);
  return (
    <TextArea
      placeholder="enter body"
      label="Body"
      value={body}
      pending={pending}
      onValueChange={handleBodyChange}
    />
  );
};

const TitleFiled = () => {
  const [title, handleTitleChange, pending] = useUnit([$title, titleChanged, $pending]);
  return (
    <Input
      placeholder="enter title"
      label="Title"
      value={title}
      pending={pending}
      onValueChange={handleTitleChange}
    />
  );
};
