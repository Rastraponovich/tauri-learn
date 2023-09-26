import { useUnit } from "effector-react";
import { t } from "i18next";
import { type ElementType, type FormEvent, useCallback, useState } from "react";

import { Input } from "~/shared/ui/input";
import { Select, SelectTemplateProps } from "~/shared/ui/select";

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
      <h2>{t("category")}</h2>

      <Input value={name} onValueChange={handleNameChange} label={t("Name")} />
      <Input value={color} onValueChange={handleColorChange} label={t("Color")} type="color" />

      <CategoriesSelect onChange={handleSelect} />

      <button type="submit">{t("submit")}</button>
    </form>
  );
};

interface CategoriesSelectProps {
  onChange: (category: Category) => void;
  templateProps?: Pick<SelectTemplateProps<Category>, "displayProperty" | "keyProperty"> & object;
  template?: ElementType<SelectTemplateProps<Category>>;
}

export const CategoriesSelect = ({
  onChange,
  template: Template,
  templateProps,
}: CategoriesSelectProps) => {
  const categories = useUnit($categories);

  const [selected, setSelected] = useState({ id: 0, name: t("Select category"), color: "red" });

  const handleChange = useCallback(
    (category: Category) => {
      if (category) {
        setSelected(category);
        onChange(category);
      }
    },
    [onChange],
  );

  return (
    <Select
      items={categories}
      displayProperty="name"
      keyProperty="id"
      selected={selected}
      onSelect={handleChange}
      template={Template}
      templateProps={templateProps}
    />
  );
};
