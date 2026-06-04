import { useMemo } from "react";
import { useCartStore } from "@/store/cart.store";

export const useCart = () => {
  const items = useCartStore((s) => s.items);
  const selectedIds = useCartStore((s) => s.selectedIds);
  const toggleSelection = useCartStore((s) => s.toggleSelection);
  const selectAll = useCartStore((s) => s.selectAll);
  const deselectAll = useCartStore((s) => s.deselectAll);
  const checkoutSelected = useCartStore((s) => s.checkoutSelected);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const clearCart = useCartStore((s) => s.clearCart);

  const isSelected = (id: string) => selectedIds.includes(id);

  const isAllSelected =
    items.length > 0 && selectedIds.length === items.length;

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.includes(i.id)),
    [items, selectedIds]
  );

  const selectedTotal = useMemo(
    () => selectedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [selectedItems]
  );

  const selectedCount = selectedItems.reduce(
    (acc, i) => acc + i.quantity,
    0
  );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  return {
    items,
    selectedIds,
    selectedItems,
    selectedTotal,
    selectedCount,
    isSelected,
    isAllSelected,
    toggleSelection,
    toggleSelectAll,
    checkoutSelected,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  };
};
