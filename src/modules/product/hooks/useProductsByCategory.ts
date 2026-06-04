import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: productKeys.list(categoryId),
    queryFn: () => ProductService.getByCategory(categoryId),
    enabled: !!categoryId,
  });
};
export default useProductsByCategory;
