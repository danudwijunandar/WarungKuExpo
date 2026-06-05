export interface HistoryItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface HistoryTransaction {
  id: string;
  items: HistoryItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string; // ISO string format
  paymentMethod: "CASH" | "TRANSFER" | "E_WALLET";
  status: "success";
}
