export interface SpritesMap {
  arrows: "chevron-selector-vertical";
  general: "check";
  weather: "moon-star" | "sun";
}
export const SPRITES_META = {
  arrows: ["chevron-selector-vertical"],
  general: ["check"],
  weather: ["moon-star", "sun"],
} satisfies {
  arrows: Array<"chevron-selector-vertical">;
  general: Array<"check">;
  weather: Array<"moon-star" | "sun">;
};
