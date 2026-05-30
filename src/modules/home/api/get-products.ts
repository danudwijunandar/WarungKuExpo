import { client } from "@/services/client";
import { ENDPOINTS } from "@/services/endpoints";

import { Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await client.get(ENDPOINTS.PRODUCT);

  return response.data;
};
