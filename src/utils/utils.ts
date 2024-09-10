export const convertDateToString = (date: Date) => {
  if (!isNaN(date.getTime())) return date.toISOString().split("T")[0];
};
