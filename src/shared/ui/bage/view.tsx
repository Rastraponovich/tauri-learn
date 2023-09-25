import clsx from "clsx";
import { type ReactNode, forwardRef } from "react";

interface BadgeProps {
  children: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  selected?: boolean;
  variant?: "success" | "error";
  size?: "sm" | "md" | "xs" | "lg" | "xl";
}

const variants = {
  success: "bg-green-600",
  error: "bg-rose-600",
};

const sizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-xl",
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = "success", size = "md", onClick, selected }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={clsx(
          "flex cursor-pointer items-center justify-center rounded-3xl text-white outline outline-offset-2 hover:outline-gray-200",
          variants[variant],
          sizes[size],
          selected && "outline-blue-500",
        )}
      >
        {children}
      </div>
    );
  },
);
