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
  } else if (type === "form") {
    function isURL(url) {
      const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return regex.test(url);
    }

    const {
      title,
      volume,
      cover,
      publishedAt,
      country,
      language,
      resourceType,
      source,
      summary,
      authors,
      keywords,
    } = element;

    if (title.trim().length === 0) {
      return {
        target: "title",
        message: warnMessages.empty.title,
      };
    }

    if (volume.trim().length === 0) {
      return {
        target: "volume",
        message: warnMessages.empty.volume,
      };
    }

    if (isURL(cover) === false) {
      return {
        target: "cover",
        message: warnMessages.empty.cover,
      };
    }

    if (publishedAt.trim().length === 0) {
      return {
        target: "publishedAt",
        message: warnMessages.empty.publishedAt,
      };
    }

    if (country === "") {
      return { target: "country", message: warnMessages.empty.country };
    }

    if (language === "") {
      return { target: "language", message: warnMessages.empty.language };
    }

    if (resourceType === "") {
      return {
        target: "resourceType",
        message: warnMessages.empty.resourceType,
      };
    }

    if (isURL(source) === false) {
      return {
        target: "source",
        message: warnMessages.empty.source,
      };
    }

    if (keywords.length === 0) {
      return {
        target: "keywords",
        message: warnMessages.empty.keywords,
      };
    }

    if (authors.length === 0) {
      return {
        target: "authors",
        message: warnMessages.empty.authors,
      };
    }

    if (summary.trim().length === 0) {
      return {
        target: "summary",
        message: warnMessages.empty.summary,
      };
    }

    return false;
  } else {
    console.error("Validatsiya bunday qiymatni qabul qilmaydi");
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
