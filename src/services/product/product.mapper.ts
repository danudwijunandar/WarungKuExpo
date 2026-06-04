import { Product } from "@/types/product";
import { ProductResponse } from "./product.types";

export const mapProductResponse = (response: ProductResponse): Product => {
  return {
    id: response.id,
    categoryId: response.categoryId,
    name: response.name,
    image: response.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
    description: response.description || "",
    price: typeof response.price === "string" ? parseFloat(response.price) || 0 : response.price,
    stock: typeof response.stock === "string" ? parseInt(response.stock, 10) || 0 : response.stock,
    expiredDate: response.expiredDate || "",
    entryDate: response.entryDate || "",
    brand: response.brand || "",
  };
};

export const mapProductsResponse = (response: ProductResponse[]): Product[] => {
  return response.map(mapProductResponse);
};
