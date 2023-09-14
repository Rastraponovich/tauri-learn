import { useList, useStoreMap, useUnit } from "effector-react";
import { type ChangeEvent, MouseEvent, useCallback } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { Button } from "~/shared/ui/button";

import { $pending, $users, limitChanged, userCardClicked, userDeleteButtonClicked } from "./model";

export const UsersPage = () => {
  const [handleLimitChanged, pending] = useUnit([limitChanged, $pending]);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleLimitChanged(+event.target.value);
  };

  return (
    <MainLayout>
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

          <h1 className="text-bold text-3xl">Users List</h1>
        </header>

        <UsersList />
      </main>
    </MainLayout>
  );
};

const UsersList = () => {
  const [handleClick, onDelete] = useUnit([userCardClicked, userDeleteButtonClicked]);

  const handleDelete = useCallback((event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();

    onDelete({ id });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {useList($users, {
        fn: ({ id }) => (
          <UserCard
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

interface UserCardProps {
  id: number;
  onClick(): void;
  onDelete(event: MouseEvent<HTMLButtonElement>): void;
}

const UserCard = ({ id, onClick, onDelete }: UserCardProps) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users) => users.find((user) => user.id === id)!,
  });

  return (
    <div className="flex flex-col gap-2 rounded-md  p-2 shadow-md" onClick={onClick}>
      <div className="flex items-center justify-between">
        <span>{user.name}</span>

        <Button onClick={onDelete}>delete</Button>
      </div>
      <span className="text-sm font-light">{user.email}</span>
    </div>
  );
};
