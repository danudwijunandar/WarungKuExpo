export interface Product {
  id: string;
  categoryId: string;

  name: string;
  image: string;
  description: string;

  price: number;
  stock: number;

  expiredDate: string;
  entryDate: string;

  brand: string;
}
