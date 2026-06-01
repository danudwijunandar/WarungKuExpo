import { Category } from "@/modules/categories/types/categories.types";
import axios from "axios";

const BASE_URL = "https://6a198d06489e4715751a18af.mockapi.io";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);

  return response.data;
};
