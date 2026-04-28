import { format, isValid, parseISO } from "date-fns";

type DateInput = Date | string | number;

export function formatDate(
  date: DateInput,
  formatStr: string = "yyyy-MM-dd",
): string {
  try {
    let parsedDate: Date;

    if (typeof date === "string") {
      parsedDate = parseISO(date);
    } else {
      parsedDate = new Date(date);
    }

    if (!isValid(parsedDate)) {
      return "";
    }

    return format(parsedDate, formatStr);
  } catch {
    return "";
  }
}

export const formatAppointmentTime = (time: string) => {
  return formatDate(time, "MMM d, yyyy, h:mm a");
};

export const formatAppointmentTimeToDate = (time: string) => {
  return formatDate(time, "MMM d, yyyy");
};

export const formatAppointmentTimeToTime = (time: string) => {
  return formatDate(time, "h:mm a");
};
