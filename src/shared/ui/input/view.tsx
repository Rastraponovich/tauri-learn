import clsx from "clsx";
import {
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  forwardRef,
} from "react";

interface BaseInputProps {
  pending?: boolean;
  onValueChange?: (value: string) => void;
  label?: ReactNode;
}

interface TextAreaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { pending, disabled, label, rows = 10, className, onChange, onValueChange, ...restProps },
    ref,
  ) => {
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      if (onValueChange) {
        return onValueChange(event.target.value);
      }

      if (onChange) {
        return onChange(event);
      }
    };
    return (
      <label htmlFor="" className="flex grow flex-col gap-2">
        {label && <span className="text-left text-sm font-normal">{label}</span>}
        <textarea
          ref={ref}
          {...restProps}
          disabled={pending || disabled}
          aria-disabled={pending || disabled}
          onChange={handleChange}
          className={clsx(
            "w-full grow resize-none rounded-md border p-2  transition duration-300 ease-in-out",
            "disabled:border-transparent disabled:bg-transparent disabled:shadow-none",
            className,
          )}
        />
      </label>
    );
  },
);

interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
  pending?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { disabled, pending, className, onChange, onValueChange, type = "text", label, ...restProps },
    ref,
  ) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (onValueChange) {
        return onValueChange(event.target.value);
      }

      if (onChange) {
        return onChange(event);
      }
    };
    return (
      <label className="flex w-full flex-col gap-2 text-sm">
        {label && <span className="text-left font-normal">{label}</span>}
        <input
          ref={ref}
          type={type}
          disabled={pending || disabled}
          aria-disabled={pending || disabled}
          onChange={handleChange}
          className={clsx(
            "w-full rounded-lg border px-3 py-2 dark:text-gray-900",
            "disabled:border-transparent",
            className,
          )}
          {...restProps}
        />
      </label>
    );
  },
);
