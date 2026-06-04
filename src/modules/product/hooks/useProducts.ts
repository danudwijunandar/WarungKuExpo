import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product/product.service";
import { productKeys } from "./query-keys";

export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: ProductService.getAll,
  });
};
export default useProducts;
