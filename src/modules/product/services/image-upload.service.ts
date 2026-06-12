import * as FileSystem from "expo-file-system/legacy";

interface ImageUploadResponse {
  success: boolean;
  data?: {
    url: string;
    display_url: string;
    delete_url: string;
    [key: string]: any;
  };
  error?: {
    code: number;
    message: string;
  };
}

const IMGBB_API_URL = "https://api.imgbb.com/1/upload";
const API_KEY = process.env.EXPO_PUBLIC_IMGBB_API_KEY;

export const ImageUploadService = {
  uploadImage: async (imageUri: string): Promise<string> => {
    if (!API_KEY) {
      throw new Error("ImgBB API key tidak ditemukan di environment variables");
    }

    try {
      // Validate URI format
      if (!imageUri || typeof imageUri !== "string") {
        throw new Error("Image URI tidak valid");
      }

      // Read image file sebagai base64
      let imageBase64: string;
      try {
        imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } catch (readError) {
        console.error("[ImageUpload] File read error:", readError);
        throw new Error(
          `Gagal membaca file gambar: ${
            readError instanceof Error ? readError.message : "Unknown error"
          }`,
        );
      }

      if (!imageBase64 || imageBase64.length === 0) {
        throw new Error("File gambar kosong atau tidak valid");
      }

      // Create FormData
      const formData = new FormData();
      formData.append("image", imageBase64);
      formData.append("expiration", "15552000");

      // Upload using Fetch API
      let uploadResponse;
      try {
        uploadResponse = await fetch(`${IMGBB_API_URL}?key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
      } catch (uploadError) {
        console.error("[ImageUpload] Upload error:", uploadError);
        throw new Error(
          `Gagal upload ke ImgBB: ${
            uploadError instanceof Error ? uploadError.message : "Network error"
          }`,
        );
      }

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("[ImageUpload] HTTP error response:", errorText);
        throw new Error(
          `Gagal membaca file gambar (HTTP ${uploadResponse.status})`,
        );
      }

      const responseData: ImageUploadResponse = await uploadResponse.json();

      if (responseData.success && responseData.data?.url) {
        return responseData.data.url;
      }

      throw new Error(
        responseData.error?.message || "Upload gagal: Response tidak valid",
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal upload gambar ke ImgBB";
      console.error("[ImageUpload] Error:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};
