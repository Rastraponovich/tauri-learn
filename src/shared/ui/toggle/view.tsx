import { Switch } from "@headlessui/react";
import clsx from "clsx";

import { Icon, type IconName } from "../icon";

type Size = "sm" | "md" | "lg";

const TOGGLER_STYLES = {
  sm: "h-2.5 w-[18px] border",
  md: "h-[19px] w-[35px] border-[1.5px]",
  lg: "h-9 w-[72px] border-2",
};

const POINTER_STYLES = {
  sm: "h-2 w-2 p-px",
  md: "h-4 w-4 p-0.5",
  lg: "h-8 w-8 p-1",
};

const TRANSLATE = {
  sm: "translate-x-2",
  md: "translate-x-4",
  lg: "translate-x-9",
};

interface ToggleProps {
  size?: Size;
  title?: string;
  enabled: boolean;
  onChange: () => void;
  activeIcon?: IconName;
  inactiveIcon?: IconName;
  iconClassName?: string;
  activeIconClassName?: string;
  inActiveIconClassName?: string;
}

export const Toggle = ({
  size = "md",
  activeIcon,
  inactiveIcon,
  enabled,
  iconClassName,
  activeIconClassName,
  inActiveIconClassName,
  ...restProps
}: ToggleProps) => {
  return (
    <Switch
      checked={enabled}
      {...restProps}
      className={clsx(
        TOGGLER_STYLES[size],
        enabled ? "bg-teal-900" : "bg-teal-700",
        "trans relative inline-flex",
        "shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
      )}
    >
      <div
        aria-hidden="true"
        className={clsx(
          POINTER_STYLES[size],
          enabled ? TRANSLATE[size] : "translate-x-0",
          "pointer-events-none flex transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
        )}
      >
        {activeIcon && inactiveIcon && (
          <Icon
            name={enabled ? activeIcon : inactiveIcon}
            className={clsx(enabled ? activeIconClassName : inActiveIconClassName, iconClassName)}
          />
        )}
      </div>
    </Switch>
  );
};
