import { useQuery } from "@tanstack/react-query";

import { getProductsByCategory } from "@/modules/product/api/get-product-by-category";

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", categoryId],

    queryFn: () => getProductsByCategory(categoryId),

    staleTime: 1000 * 60 * 5,
  });
};
