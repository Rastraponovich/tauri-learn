import { combine, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

export type Category = {
  id: number;
  name: string;
  color: string;
};

export const formSubmitted = createEvent();

export const nameChanged = createEvent<string>();
export const colorChanged = createEvent<string>();
export const categoriesChanged = createEvent<Omit<Category, "id">>();

export const $name = createStore("");
export const $color = createStore("");

export const $categories = createStore<Category[]>([]);

$name.on(nameChanged, (_, name) => name);
$color.on(colorChanged, (_, color) => color);

$categories.on(categoriesChanged, (categories, category) => {
  return [...categories, { ...category, id: categories.length }];
});

const $category = combine({
  name: $name,
  color: $color,
});

sample({
  clock: formSubmitted,
  source: $category,
  target: categoriesChanged,
});

reset({
  clock: categoriesChanged,
  target: [$name, $color],
});
