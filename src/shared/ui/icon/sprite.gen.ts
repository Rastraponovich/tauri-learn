export interface SpritesMap {
  weather: "sun" | "moon-star";
}
export const SPRITES_META = {
  weather: ["sun", "moon-star"],
} satisfies {
  weather: Array<"sun" | "moon-star">;
};
