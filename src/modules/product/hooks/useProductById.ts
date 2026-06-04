import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => ProductService.getById(id),
    enabled: !!id,
  });
};
export default useProductById;
