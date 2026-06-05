import { create } from "zustand";
import { useToastStore } from "./toast.store";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  selectedIds: string[];

  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  toggleSelection: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  checkoutSelected: () => void;
  clearSelectedItems: (ids: string[]) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  selectedIds: [],

  addToCart: (item, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      useToastStore.getState().showToast(
        `"${item.title}" ditambahkan ke keranjang`,
        "success"
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity }],
        // auto-select newly added item
        selectedIds: [...state.selectedIds, item.id],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    })),

  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
      selectedIds: state.items
        .find((i) => i.id === id)?.quantity === 1
        ? state.selectedIds.filter((sid) => sid !== id)
        : state.selectedIds,
    })),

  clearCart: () => set({ items: [], selectedIds: [] }),

  toggleSelection: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),

  selectAll: () =>
    set((state) => ({
      selectedIds: state.items.map((item) => item.id),
    })),

  deselectAll: () => set({ selectedIds: [] }),

  checkoutSelected: () => {
    const { items, selectedIds } = get();
    const selectedItems = items.filter((i) => selectedIds.includes(i.id));
    const count = selectedItems.length;

    if (count === 0) return;

    set({
      items: items.filter((i) => !selectedIds.includes(i.id)),
      selectedIds: [],
    });

    useToastStore.getState().showToast(
      `${count} produk berhasil dibeli. Terima kasih sudah berbelanja!`,
      "success"
    );
  },

  clearSelectedItems: (ids) =>
    set((state) => ({
      items: state.items.filter((i) => !ids.includes(i.id)),
      selectedIds: state.selectedIds.filter((sid) => !ids.includes(sid)),
    })),
}));
