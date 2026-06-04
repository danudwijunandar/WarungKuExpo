export interface ProductResponse {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  description: string;
  price: string | number; // mockapi might return strings for numeric types sometimes
  stock: string | number;
  expiredDate: string;
  entryDate: string;
  brand: string;
}

export interface CreateProductRequest {
  categoryId: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  expiredDate: string;
  brand: string;
}

export interface UpdateProductRequest {
  id: string;
  categoryId?: string;
  name?: string;
  image?: string;
  description?: string;
  price?: number;
  stock?: number;
  expiredDate?: string;
  brand?: string;
}
