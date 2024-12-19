import { warnMessages } from "@/constants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getFormData(form) {
  const result = {};
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    result[key] = value;
  }
  return result;
}

export function validate(element, type) {
  if (type === "login") {
    if (element.username.trim() === "") {
      return warnMessages.empty.username;
    }
    if (element.password.trim() === "") {
      return warnMessages.empty.passsword;
    }
    return false;
  }
}

export function getUntilNow(start) {
  const now = new Date().getFullYear();
  const years = [];
  for (let i = start; i <= now; i++) {
    years.push(i);
  }
  return years;
}
