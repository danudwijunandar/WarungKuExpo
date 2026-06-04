import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { ProductService } from "@/services/product/product.service";
import { productKeys } from "@/modules/product/hooks/query-keys";
import { useCartStore, CartItem } from "@/store/cart.store";
import { useToastStore } from "@/store/toast.store";

interface CheckoutInput {
  items: CartItem[];
}

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const clearSelectedItems = useCartStore((s) => s.clearSelectedItems);
  const showToast = useToastStore((s) => s.showToast);

  return useMutation({
    mutationFn: async ({ items }: CheckoutInput) => {
      // 1. Fetch fresh product data for all items in parallel
      const products = await Promise.all(
        items.map((item) => ProductService.getById(item.id))
      );

      // 2. Validate stock for each item
      for (let i = 0; i < items.length; i++) {
        const product = products[i];
        const cartItem = items[i];

        if (product.stock < cartItem.quantity) {
          throw new Error(
            `Stock "${product.name}" tidak mencukupi (tersedia: ${product.stock}, diminta: ${cartItem.quantity})`
          );
        }
      }

      // 3. Update all stocks in parallel
      await Promise.all(
        items.map((cartItem, i) =>
          ProductService.updateStock(
            cartItem.id,
            products[i].stock - cartItem.quantity
          )
        )
      );

      return items;
    },

    onSuccess: (checkedOutItems) => {
      const ids = checkedOutItems.map((i) => i.id);
      const count = checkedOutItems.length;

      // Remove checked-out items from cart
      clearSelectedItems(ids);

      // Refetch product data so stock is fresh everywhere
      queryClient.invalidateQueries({ queryKey: productKeys.all });

      showToast(
        `${count} produk berhasil di-checkout. Terima kasih!`,
        "success"
      );
    },

    onError: (error: Error) => {
      Alert.alert("Checkout Gagal", error.message);
      showToast("Checkout gagal, silakan coba lagi", "error");
    },
  });
};
