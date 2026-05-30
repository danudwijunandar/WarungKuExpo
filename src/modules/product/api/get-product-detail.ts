import { client } from "@/services/client";

import { Product } from "@/types/product";

export const getProductDetail = async (id: string): Promise<Product> => {
  const response = await client.get(`/product/${id}`);

  return response.data;
};
