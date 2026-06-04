import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoriteItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface FavoriteState {
  items: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      items: [],

      addFavorite: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearFavorites: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "favorite-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
