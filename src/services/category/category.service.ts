import { client } from "../client";
import { ENDPOINTS } from "../endpoints";
import { Category } from "@/types/category";
import { CategoryResponse } from "./category.types";
import { mapCategoriesResponse } from "./category.mapper";

export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await client.get<CategoryResponse[]>(ENDPOINTS.CATEGORIES);
    return mapCategoriesResponse(response.data);
  },
};
