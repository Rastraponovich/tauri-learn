import clsx from "clsx";
import { type SVGProps, forwardRef } from "react";

import { SpritesMap } from "./sprite.gen";

// Merging all icons as `SPRITE_NAME/SPRITE_ICON_NAME`
export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "type"> {
  name: IconName;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, viewBox, ...props }, ref) => {
    const [spriteName, iconName] = name.split("/");

    return (
      <svg
        ref={ref}
        // We recommend to use specific component class for avoid collisions with other styles and simple override it
        className={clsx("icon", className)}
        viewBox={viewBox}
        focusable="false"
        aria-hidden
        {...props}
      >
        {/* For example, "/common.svg#favourite". Change base path if you don't store sprites under the root. */}
        <use href={`/${spriteName}.svg#${iconName}`} />
      </svg>
    );
  },
);
