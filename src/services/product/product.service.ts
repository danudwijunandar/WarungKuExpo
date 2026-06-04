import { client } from "../client";
import { ENDPOINTS } from "../endpoints";
import { Product } from "@/types/product";
import { CreateProductRequest, UpdateProductRequest, ProductResponse } from "./product.types";
import { mapProductResponse, mapProductsResponse } from "./product.mapper";

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    const response = await client.get<ProductResponse[]>(ENDPOINTS.PRODUCTS);
    return mapProductsResponse(response.data);
  },

  getById: async (id: string): Promise<Product> => {
    const response = await client.get<ProductResponse>(`${ENDPOINTS.PRODUCTS}/${id}`);
    return mapProductResponse(response.data);
  },

  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const response = await client.get<ProductResponse[]>(ENDPOINTS.PRODUCTS);
    const filtered = response.data.filter((item) => item.categoryId === categoryId);
    return mapProductsResponse(filtered);
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const payload = {
      ...data,
      entryDate: new Date().toISOString().split("T")[0],
    };
    const response = await client.post<ProductResponse>(ENDPOINTS.PRODUCTS, payload);
    return mapProductResponse(response.data);
  },

  update: async (id: string, data: Omit<UpdateProductRequest, "id">): Promise<Product> => {
    const response = await client.put<ProductResponse>(`${ENDPOINTS.PRODUCTS}/${id}`, data);
    return mapProductResponse(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  },

  updateStock: async (id: string, newStock: number): Promise<Product> => {
    const response = await client.put<ProductResponse>(
      `${ENDPOINTS.PRODUCTS}/${id}`,
      { stock: newStock }
    );
    return mapProductResponse(response.data);
  },
};
