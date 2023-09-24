import clsx from "clsx";
import { type ReactNode, forwardRef } from "react";

interface BadgeProps {
  children: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  variant?: "success" | "error";
  size?: "sm" | "md";
}

const variants = {
  success: "bg-green-600",
  error: "bg-rose-600",
};

const sizes = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = "success", size = "md" }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex items-center justify-center rounded-3xl text-white outline outline-offset-2 hover:outline-gray-200",
          variants[variant],
          sizes[size],
        )}
      >
        {children}
      </div>
    );
  },
);
