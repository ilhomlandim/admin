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
    setAdmin(admin) {
      return set(() => {
        return { admin };
      });
    },
    setAddItemDrawer(value) {
      return set((state) => {
        console.log({ ...value, modal: !state.addItemDrawer.modal });
        return {
          addItemDrawer: { ...value, modal: !state.addItemDrawer.modal },
        };
      });
    },
  };
});
