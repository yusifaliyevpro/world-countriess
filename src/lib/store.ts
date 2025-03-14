import { create } from "zustand";

interface StoreState {
  search: string;
  page: number;
  resultCount: number | null;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setResultCount: (resultCount: number | null) => void;
}

const useStore = create<StoreState>((set) => ({
  search: "",
  page: 1,
  resultCount: null,
  setSearch: (search: string) => set({ search }),
  setPage: (page: number) => set({ page }),
  setResultCount: (resultCount: number | null) => set({ resultCount }),
}));

export default useStore;
