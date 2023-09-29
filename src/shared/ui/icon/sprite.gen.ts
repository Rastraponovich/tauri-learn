export interface SpritesMap {
  weather: "sun" | "moon-star";
  arrows: "chevron-selector-vertical";
}
export const SPRITES_META = {
  weather: ["sun", "moon-star"],
  arrows: ["chevron-selector-vertical"],
} satisfies {
  weather: Array<"sun" | "moon-star">;
  arrows: Array<"chevron-selector-vertical">;
};
