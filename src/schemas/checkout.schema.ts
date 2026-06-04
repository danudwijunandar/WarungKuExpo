import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Nama lengkap penerima minimal harus 3 karakter"),
  phone: z.string()
    .min(10, "Nomor telepon minimal harus 10 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka"),
  address: z.string().min(10, "Alamat pengiriman minimal harus 10 karakter"),
  paymentMethod: z.enum(["CASH", "TRANSFER", "E_WALLET"] as const, {
    message: "Pilih salah satu metode pembayaran",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
