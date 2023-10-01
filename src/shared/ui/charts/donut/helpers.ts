/**
 * Generate the function comment for the given function body.
 *
 * @param {number[]} data - an array of numbers
 * @param {number} gap - the gap between the two slices
 * @return {string} a string representation of the modified array
 */
export function getStrokeDashArray(data: number[], gap: number): string {
  return [data[0] - gap, data[1]].join(", ");
}

/**
 * Generates an array of objects containing the input data and offset values.
 *
 * @param {number[]} data - An array of numbers.
 * @return {{ value: number[]; offset: number }[]} - An array of objects, each containing a 'value' array and an 'offset' number.
 */
export function getData(data: number[]): { value: number[]; offset: number }[] {
  return data.reduce<{ value: number[]; offset: number }[]>((result, value, index, arr) => {
    const offset = index >= 1 ? result[index - 1].offset - arr[index - 1] : 0;
    return [...result, { value: [value, 100], offset }];
  }, []);
}
