import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { t } from "i18next";
import {
  type ChangeEvent,
  type ElementType,
  Fragment,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

type SelectItem = Record<string, string | number | boolean>;
interface SelectProps<T> {
  items: T[];
  selected: T;
  keyProperty: keyof T;
  displayProperty: keyof T;
  onSelect: (value: T) => void;
  template?: ElementType<SelectTemplateProps<T>>;
  templateProps?: Pick<SelectTemplateProps<T>, "displayProperty" | "keyProperty"> & object;
}

export function Select<T extends SelectItem>({
  items,
  selected,
  onSelect,
  keyProperty,
  displayProperty,
  template: Template = SelectTemplate,
}: SelectProps<T>) {
  const [query, setQuery] = useState("");

  const itemsFiltered = useMemo(() => {
    return query === ""
      ? items
      : items.filter((item) =>
          item[displayProperty]
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  }, [query, items, displayProperty]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleDisplayValue = useCallback((item: T) => {
    return t(item[displayProperty] as string);
  }, []);

  return (
    <Combobox value={selected} onChange={onSelect}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
            displayValue={handleDisplayValue}
            onChange={handleSearch}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <span className="h-5 w-5 text-gray-400" aria-hidden="true">
              V
            </span>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {itemsFiltered.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              itemsFiltered.map((item) => (
                <Combobox.Option
                  key={item[keyProperty] as string}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-teal-600 text-white" : "text-gray-900",
                    )
                  }
                  value={item}
                >
                  {(itemProps) => (
                    <Template
                      item={item}
                      {...itemProps}
                      keyProperty={keyProperty}
                      displayProperty={displayProperty}
                    />
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export interface SelectTemplateProps<T> {
  displayProperty: keyof T;
  keyProperty: keyof T;
  disabled: boolean;
  selected: boolean;
  active: boolean;
  item: T;
}
const SelectTemplate = memo<SelectTemplateProps<any>>(
  ({ item, active, selected, displayProperty }) => {
    return (
      <div>
        <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
          {item[displayProperty] as string}
        </span>
        {selected && (
          <span
            className={clsx(
              "absolute inset-y-0 left-0 flex items-center pl-3",
              active ? "text-white" : "text-teal-600",
            )}
          >
            <span className="h-5 w-5" aria-hidden="true">
              X
            </span>
          </span>
        )}
      </div>
    );
  },
);
