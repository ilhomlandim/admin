import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    admin: null,
    setAdmin(admin) {
      return set(() => {
        return { admin };
      });
    },
  };
});
