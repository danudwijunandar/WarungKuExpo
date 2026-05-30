import { client } from "@/services/client";
import { ENDPOINTS } from "@/services/endpoints";

import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await client.get(ENDPOINTS.CATEGORIES);

  return response.data;
};
