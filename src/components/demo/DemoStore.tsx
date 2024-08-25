import { create } from "zustand";

interface DemoState {
  selected: string;
  unSelectedAll: () => void;
  updateSelected: (newID: string) => void;
}

const useDemoStore = create<DemoState>((set) => ({
  selected: "",
  unSelectedAll: () => set(() => ({
    selected: ""
  })),
  updateSelected: (newID: string) => set(() => ({
    selected: newID
  })),
}));

export default useDemoStore;
