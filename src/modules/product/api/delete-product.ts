import { client } from "@/services/client";

export const deleteProduct = async (id: string): Promise<void> => {
  await client.delete(`/product/${id}`);
};
