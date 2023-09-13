import { useUnit } from "effector-react";
import { FormEvent } from "react";

import { Button } from "~/shared/ui/button";
import { Input, TextArea } from "~/shared/ui/input";

import { $body, $name, bodyChanged, formSubmitted, nameChanged } from "./model";

export const CommentForm = ({ postId }: { postId: number }) => {
  const onSubmit = useUnit(formSubmitted);

  const [name, body] = useUnit([$name, $body, nameChanged, bodyChanged]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ postId });
  };

  return (
    <div className="flex flex-col rounded-md border bg-gray-100 p-2">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input placeholder="enter name" value={name} onValueChange={nameChanged} />
        <TextArea placeholder="enter body" rows={5} value={body} onValueChange={bodyChanged} />

        <div className="flex items-center justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
