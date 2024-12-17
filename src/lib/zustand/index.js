import { create } from "zustand";

export const useAppStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem("admin")),
  setAdmin(admin) {
    return set(() => {
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        localStorage.removeItem("admin");
      }
      return { admin };
    });
  },
}));
