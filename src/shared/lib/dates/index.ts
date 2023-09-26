/**
 * Converts a given date object to a string in the format "YYYY-MM-DD".
 *
 * @param {Date} date - The date to be converted.
 * @return {string} The converted date string.
 */
export const convertDateToString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};
