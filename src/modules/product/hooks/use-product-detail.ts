import { useQuery } from "@tanstack/react-query";

import { getProductDetail } from "../api/get-product-detail";

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductDetail(id),

    enabled: !!id,
  });
};
