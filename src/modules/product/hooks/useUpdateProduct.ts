import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";
import { UpdateProductRequest } from "@/services/product/product.types";
import { useToastStore } from "@/store/toast.store";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateProductRequest) => ProductService.update(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(updatedProduct.id) });
      showToast(`Produk "${updatedProduct.name}" berhasil diperbarui!`, "success");
    },
  });
};
export default useUpdateProduct;
