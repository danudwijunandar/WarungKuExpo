import { create } from "zustand";

export interface ModalProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  stock?: number;
}

interface QuantityModalState {
  visible: boolean;
  product: ModalProduct | null;
  openModal: (product: ModalProduct) => void;
  closeModal: () => void;
}

export const useQuantityModalStore = create<QuantityModalState>((set) => ({
  visible: false,
  product: null,
  openModal: (product) => set({ visible: true, product }),
  closeModal: () => set({ visible: false, product: null }),
}));
