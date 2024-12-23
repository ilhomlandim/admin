import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    admin: null,
    addItemDrawer: {
      modal: false,
      title: null,
      description: null,
      children: null,
      height: null,
    },
    gKeywords: [],
    gAuthors: [],
    counter: 1,
    setAdmin(admin) {
      return set(() => {
        return { admin };
      });
    },
    setAddItemDrawer(value) {
      return set((state) => {
        return {
          addItemDrawer: { ...value, modal: !state.addItemDrawer.modal },
        };
      });
    },
    setGKeywords(gKeywords) {
      return set(() => {
        return {
          gKeywords,
        };
      });
    },
    setGAuthors(gAuthors) {
      return set(() => {
        return {
          gAuthors,
        };
      });
    },
    setCounter(counter) {
      return set(() => {
        return {
          counter,
        };
      });
    },
  };
});
