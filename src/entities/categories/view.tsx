import { useList, useStoreMap, useUnit } from "effector-react";
import { ChangeEvent, FormEvent } from "react";

import { Input } from "~/shared/ui/input";

import {
  $categories,
  $color,
  $name,
  Category,
  colorChanged,
  formSubmitted,
  nameChanged,
} from "./model";

export const CategoryForm = () => {
  const [onSubmit, handleNameChange, handleColorChange] = useUnit([
    formSubmitted,
    nameChanged,
    colorChanged,
  ]);

  const [name, color] = useUnit([$name, $color]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleSelect = (val: any) => {
    console.log(val);
  };
  return (
    <form
      id="form"
      className="flex flex-col gap-2 rounded-md p-4 shadow-md"
      onSubmit={handleSubmit}
    >
      <h2>category</h2>

      <Input value={name} onValueChange={handleNameChange} label="Name" />
      <Input value={color} onValueChange={handleColorChange} label="Color" type="color" />

      <CategoriesSelect onChange={handleSelect} />

      <button type="submit">submit</button>
    </form>
  );
};

interface CategoriesSelectProps {
  onChange: (category: Category) => void;
}

export const CategoriesSelect = ({ onChange }: CategoriesSelectProps) => {
  const categories = useUnit($categories);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find((category) => category.id === +event.target.value);

    if (category) {
      onChange(category);
    }
  };

  return (
    <select onChange={handleChange}>
      {useList($categories, {
        fn: ({ id }) => <CategoryEntity id={id} />,
      })}
    </select>
  );
};

interface CategoryEntityProps {
  id: number;
}

const CategoryEntity = ({ id }: CategoryEntityProps) => {
  const category = useStoreMap({
    store: $categories,
    keys: [id],
    fn: (categories) => categories.find((category) => category.id === id)!,
  });
  return <option value={id}>{category.name}</option>;
};
