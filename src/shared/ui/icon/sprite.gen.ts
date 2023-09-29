export interface SpritesMap {
  weather: "sun" | "moon-star";
  arrows: "chevron-selector-vertical";
  general: "check";
}
export const SPRITES_META = {
  weather: ["sun", "moon-star"],
  arrows: ["chevron-selector-vertical"],
  general: ["check"],
} satisfies {
  weather: Array<"sun" | "moon-star">;
  arrows: Array<"chevron-selector-vertical">;
  general: Array<"check">;
};
