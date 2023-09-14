import clsx from "clsx";
import { useUnit } from "effector-react";
import { type FormEvent } from "react";

import { MainLayout } from "~/layouts/main-layout";

// import { CommentForm } from "~/features/comments/create";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

import {
  $editable,
  $email,
  $name,
  $pending,
  $phone,
  $user,
  editButtonClicked,
  emailChanged,
  formSubmitted,
  nameChanged,
  phoneChanged,
} from "./model";

export const PostPage = () => {
  const user = useUnit($user)!;

  const pending = useUnit($pending);

  if (pending) return <div>Loading...</div>;
  return (
    <MainLayout actions={<Actions />}>
      <main className="flex grow flex-col gap-10">
        <section className="flex grow flex-col gap-10 p-4">
          <header className="flex flex-col gap-2">
            <h1 className="p-2 text-4xl font-bold">{user.name}</h1>
          </header>
          <UserForm />
        </section>
      </main>
    </MainLayout>
  );
};

const UserForm = () => {
  const onSubmit = useUnit(formSubmitted);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form id="form" className="flex grow flex-col gap-2 p-4" onSubmit={handleSubmit}>
      <NameField />
      <EmailField />
      <PhoneField />
      <div className="grow"></div>
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

const EmailField = () => {
  const [value, handleChange, editable] = useUnit([$email, emailChanged, $editable]);
  return <Field caption="Email" value={value} onValueChange={handleChange} disabled={!editable} />;
};

const NameField = () => {
  const [value, handleChange, editable] = useUnit([$name, nameChanged, $editable]);
  return <Field caption="Name" value={value} onValueChange={handleChange} disabled={!editable} />;
};

const PhoneField = () => {
  const [value, handleChange, editable] = useUnit([$phone, phoneChanged, $editable]);
  return <Field disabled={!editable} caption="Phone" value={value} onValueChange={handleChange} />;
};

interface FieldProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  caption: string;
}
const Field = ({ value, onValueChange, disabled, caption }: FieldProps) => {
  return (
    <div className="flex items-center gap-2">
      <span>{caption}: </span>
      <Input value={value} onValueChange={onValueChange} disabled={disabled} />
    </div>
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

// const CommentsList = () => {
//   const commentsCount = useUnit($commentsCount);
//   const params = useUnit(currentRoute.$params) as { id: number };
//   return (
//     <section className="flex flex-col gap-2 p-2">
//       <span className="text-base font-semibold">Comments: {commentsCount}</span>

//       <div className="flex flex-col gap-1 rounded-md bg-white text-sm font-normal">
//         {useList($comments, {
//           fn: (comment) => <Comment id={comment.id} />,
//         })}
//       </div>

//       <CommentForm postId={params.id} />
//     </section>
//   );
// };

// const Comment = ({ id }: { id: number }) => {
//   const comment = useStoreMap({
//     store: $comments,
//     fn: (comments) => comments.find((comment) => comment.id === id)!,
//     keys: [id],
//   });

//   return (
//     <article className="flex flex-col gap-2 rounded-md p-2 shadow-md">
//       <div className="flex items-end justify-between gap-4">
//         <h2 className="text-base font-bold">{comment.name}</h2>
//         <h4 className="font-light">{comment.email}</h4>
//       </div>

//       <p>{comment.body}</p>
//     </article>
//   );
// };
