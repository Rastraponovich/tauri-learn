import { useUnit } from "effector-react";
import { FormEvent } from "react";

import { Button } from "~/shared/ui/button";
import { Input, TextArea } from "~/shared/ui/input";

import { $body, $name, bodyChanged, formSubmitted, nameChanged } from "./model";

export const CommentForm = ({ postId }: { postId: number }) => {
  const onSubmit = useUnit(formSubmitted);

  const [name, body, handleNameChange, handleBodyChange] = useUnit([
    $name,
    $body,
    nameChanged,
    bodyChanged,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ postId });
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border bg-gray-100 p-2">
      <span>new comment</span>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input placeholder="enter name" value={name} onValueChange={handleNameChange} />
        <TextArea placeholder="enter body" rows={5} value={body} onValueChange={handleBodyChange} />

        <div className="flex items-center justify-end">
          <Button type="submit" className="hover:bg-blue-500 hover:text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
