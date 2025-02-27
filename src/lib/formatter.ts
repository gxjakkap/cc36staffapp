export const formatDateString = (date: number) => {
  const epdate = new Date(date);
  return epdate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
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
