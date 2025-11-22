import { format, isValid } from "date-fns";

export type DisplayStyle =
  | "dayMonthTime"
  | "dayMonthYear"
  | "dayMonthYearTime"
  | "timeOnly"
  | "isoDate"
  | "fullDateTime";

const formatMap: Record<DisplayStyle, string> = {
  dayMonthTime: "dd.MM. HH:mm",
  dayMonthYear: "dd.MM.yyyy",
  dayMonthYearTime: "dd.MM.yyyy HH:mm",
  timeOnly: "HH:mm",
  isoDate: "yyyy-MM-dd",
  fullDateTime: "dd.MM.yyyy HH:mm",
};

export function formatDateString(
  inputDate: string | number | Date,
  displayStyle: DisplayStyle = "dayMonthYear"
): string {
  const dateObj = inputDate instanceof Date ? inputDate : new Date(inputDate);
  if (!isValid(dateObj)) {
    return String(inputDate);
  }
  const fmt = formatMap[displayStyle] || formatMap.fullDateTime;
  return format(dateObj, fmt);
}
