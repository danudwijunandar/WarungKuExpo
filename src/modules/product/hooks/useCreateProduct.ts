import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";
import { CreateProductRequest } from "@/services/product/product.types";
import { useToastStore } from "@/store/toast.store";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (data: CreateProductRequest) => ProductService.create(data),
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      showToast(`Produk "${newProduct.name}" berhasil ditambahkan!`, "success");
    },
  });
};
export default useCreateProduct;
