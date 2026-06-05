import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryTransaction, HistoryItem } from "@/modules/history/types/history.types";
import { generateTransactionId } from "@/modules/history/utils/history.utils";

interface HistoryState {
  transactions: HistoryTransaction[];
  addTransaction: (
    items: Omit<HistoryItem, "">[],
    paymentMethod: HistoryTransaction["paymentMethod"]
  ) => HistoryTransaction;
  deleteTransaction: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (items, paymentMethod) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const datePrefix = `TRX-${year}${month}${day}-`;

        // Count existing transactions from today
        const todayTransactions = get().transactions.filter((tx) =>
          tx.id.startsWith(datePrefix)
        );
        const count = todayTransactions.length;

        const transactionId = generateTransactionId(now, count);
        
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newTransaction: HistoryTransaction = {
          id: transactionId,
          items: items as HistoryItem[],
          totalItems,
          totalPrice,
          createdAt: now.toISOString(),
          paymentMethod,
          status: "success",
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));

        return newTransaction;
      },

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),

      clearHistory: () => set({ transactions: [] }),
    }),
    {
      name: "history-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
