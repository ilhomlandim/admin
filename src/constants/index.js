import { getUntilNow } from "@/lib/utils";

export const baseURL = "https://json-api.uz/api/project/chizlab";

export const errorMessages = {
  200: "Tizimga muvaffaqiyatli kirdingiz",
  400: "Login yoki maxfiy so'zni noto'g'ri kiritdingiz",
  unknown: "Nimadur xato ketdi",
};

export const warnMessages = {
  empty: {
    username: "Loginni kiriting",
    passsword: "Maxfiy so'zni kiriting",
    inputKeywords: "Kalit so'zni kiriting",
    inputAuthors: "Muallifni kiriting",
  },
  length: {
    inputKeywords: "Kalit so'z eng kamida 2 ta belgidan iborat bo'lishi kerak",
    inputAuthors: "Muallif eng kamida 6 belgidan iborat bo'lishi kerak",
  },
  has: {
    inputKeywords: "Ushbu kalit so'z allaqachon qo'shilgan",
    inputAuthors: "Ushbu muallif allaqachon qo'shilgan",
  },
  form: {
    title: "Sarlavha majburiy!",
    volume: "Sahifalar soni majburiy va raqam bo'lishi kerak!",
    cover: "Rasm uchun havola to'g'ri kiritilmagan!",
    publishedAt: "Chop etilgan yilni tanlang!",
    country: "Davlatni tanlang!",
    language: "Tilni tanlang!",
    resourceType: "Resurs turini tanlang!",
    source: "Manbaa uchun havola to'g'ri kiritilmagan!",
    summary: "Tavsif majburiy!",
    authors: "Mualliflar kiritilmagan!",
    keywords: "Kalit so'zlar kiritilmagan!",
  },
};

export const form = {
  publishedAt: [...getUntilNow(1990)],
  countries: [
    "O'zbekiston",
    "Qoraqalpog'iston",
    "Turkmaniston",
    "Rossiya",
    "Amerika",
    "Angliya",
  ],
  languages: ["O'zbek", "Qoraqalpoq", "Turkman", "Rus", "Ingliz"],
  resourceTypes: [
    "O'quv qo'llanma",
    "Tezis",
    "Maqola",
    "Darslik",
    "Monografiya",
    "Taqdimot",
    "Video",
  ],
};
