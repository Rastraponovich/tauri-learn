/**
 * Adds the specified number of days to the current date and returns the resulting date.
 *
 * @param {number} days - The number of days to add.
 * @return {Date} The date after adding the specified number of days.
 */
export const addDays = (days: number): Date => {
  const now = new Date();

  now.setDate(now.getDate() + days);

  return now;
};
