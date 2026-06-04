import { useFavoriteStore, FavoriteItem } from "@/store/favorite.store";

export const useFavorite = (id?: string) => {
  const items = useFavoriteStore((state) => state.items);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const clearFavorites = useFavoriteStore((state) => state.clearFavorites);

  const isFav = id ? items.some((item) => item.id === id) : false;

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFav) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return {
    favorites: items,
    isFavorite: isFav,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
};
