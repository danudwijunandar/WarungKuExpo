import axios from "axios";

const BASE_URL = "https://6a198d06489e4715751a18af.mockapi.io";

export const getProductsByCategory = async (categoryId: string) => {
  const response = await axios.get(`${BASE_URL}/product`);

  const filteredProducts = response.data.filter(
    (item: any) => item.categoryId === categoryId,
  );

  return filteredProducts;
};
