import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  pending?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ pending, disabled, children, className, ...restProps }, ref) => {
    return (
      <button
        ref={ref}
        disabled={pending || disabled}
        aria-disabled={pending || disabled}
        className={clsx(
          "flex items-center justify-center gap-2 rounded-md border border-current px-4 py-2",
          className,
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);
