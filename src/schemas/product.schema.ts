import { z } from "zod";
import { isValidDateString } from "./validation";

export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal harus 3 karakter"),
  brand: z.string().min(2, "Merek produk minimal harus 2 karakter"),
  categoryId: z.string().min(1, "Silakan pilih kategori produk"),
  price: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z.number({ message: "Harga harus diisi dan berupa angka" })
      .min(1000, "Harga minimal adalah Rp 1.000")
  ),
  stock: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z.number({ message: "Stok harus diisi dan berupa angka" })
      .int("Stok harus berupa bilangan bulat")
      .min(1, "Stok minimal adalah 1")
  ),
  expiredDate: z.string()
    .min(1, "Tanggal kedaluwarsa harus diisi")
    .refine(isValidDateString, {
      message: "Format tanggal kedaluwarsa harus YYYY-MM-DD dan valid",
    }),
  image: z.string().min(1, "URL Gambar harus diisi").url("Format URL gambar tidak valid"),
  description: z.string().min(10, "Deskripsi minimal harus 10 karakter"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
