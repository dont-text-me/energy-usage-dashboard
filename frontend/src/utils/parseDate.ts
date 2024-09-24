/**
 * Converts a mm-dd-yyyy string to dd-mm-yyyy
 * */
export const parseDate = (input: String): string => {
  const [month, day, year] = input.split("-").map((it) => parseInt(it));
  return [day, month, year].join("-");
};
