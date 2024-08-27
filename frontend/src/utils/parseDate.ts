/**
 * Converts a mm-dd-yyyy string to a Date object
 * */
export const parseDate = (input: String): Date => {
  const [month, day, year] = input.split("-").map((it) => parseInt(it));
  return new Date(year, month - 1 /*convert month to month index*/, day);
};
