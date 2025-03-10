import { format } from "date-fns";
import { th } from "date-fns/locale";

export const formatDateString = (date: number) => {
  const epdate = new Date(date);
  return epdate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Bangkok",
  });
};

export const genderVal = (val: string) => {
  return val === "man" ? "ชาย" : "หญิง";
};

export const titleVal = (title: string) => {
  switch (title) {
    case "miss":
      return "นางสาว";
    case "mrs":
      return "นาง";
    case "mr":
      return "นาย";
    case "master":
      return "เด็กชาย";
    case "miss_young":
      return "เด็กหญิง";
    default:
      return title;
  }
};

export const formatTextWithLineBreaks = (text: string) => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
};

export const formatPhoneNumber = (tel: string) => {
  const cleaned = ("" + tel).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return null;
};

export const formatId = (id: string) => {
  const formattedId = id.substring(0, 6);
  return formattedId;
};

export function formatThaiBuddhist(date: Date, withTime?: boolean) {
  const formattedDate = format(date, "PPP", { locale: th });
  const buddhistYear = date.getFullYear() + 543;
  if (withTime) {
    const formattedDateTime = format(date, "PPP p", { locale: th });
    return formattedDateTime.replace(
      date.getFullYear().toString(),
      buddhistYear.toString(),
    );
  }
  return formattedDate.replace(
    date.getFullYear().toString(),
    buddhistYear.toString(),
  );
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
