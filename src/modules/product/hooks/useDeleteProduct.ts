import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";
import { useToastStore } from "@/store/toast.store";
import { Product } from "@/types/product";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: productKeys.lists() });

      const previousProducts = queryClient.getQueryData<Product[]>(productKeys.lists());

      if (previousProducts) {
        queryClient.setQueryData<Product[]>(
          productKeys.lists(),
          previousProducts.filter((product) => product.id !== id)
        );
      }

      return { previousProducts };
    },
    onError: (err, id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(productKeys.lists(), context.previousProducts);
      }
    },
    onSuccess: () => {
      showToast("Produk berhasil dihapus", "success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
export default useDeleteProduct;
