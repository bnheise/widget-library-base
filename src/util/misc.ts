import { getLiferay } from "./liferay";

export const toDo = (msg: string) => {
  throw new Error(msg);
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export interface ChartData {
  [key: string]: number;
}

export const toTitleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const kebabToTitleCase = (str: string): string =>
  str
    .split("_")
    .map((word) => toTitleCase(word))
    .join(" ");

export const isValidDate = (d: Date): boolean => {
  return d.toDateString() !== "Invalid Date";
};

export const subtractWeeks = (numOfWeeks: number, date = new Date()) => {
  date.setDate(date.getDate() - numOfWeeks * 7);

  return date;
};

export const getSiteUrl = (): string =>
  (getLiferay().ThemeDisplay.getSiteAdminURL().split("/~")[0] || "")
    .replace("/group", "/web")
    .replace("/web/guest", "");
