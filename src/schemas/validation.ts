export const isValidDateString = (dateStr: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateStr.match(regEx)) return false; // Invalid format
  const d = new Date(dateStr);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, invalid date
  return d.toISOString().slice(0, 10) === dateStr;
};
