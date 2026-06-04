import { Category } from "@/types/category";
import { CategoryResponse } from "./category.types";

export const mapCategoryResponse = (response: CategoryResponse): Category => {
  return {
    id: response.id,
    name: response.name,
    icon: response.icon || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80",
  };
};

export const mapCategoriesResponse = (response: CategoryResponse[]): Category[] => {
  return response.map(mapCategoryResponse);
};
