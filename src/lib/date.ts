import { format } from "date-fns";

export function shortDate(date: Date | string) {
  return format(date, "MM/dd");
}

export function formatDate(date: Date | string) {
  return format(date, "MMM d, yyyy");
}
