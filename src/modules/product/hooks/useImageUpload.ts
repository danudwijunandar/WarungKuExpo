import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageUploadService } from "../services/image-upload.service";

export interface ImagePickerResult {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

export const useImageUpload = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async (): Promise<ImagePickerResult | null> => {
    try {
      setError(null);

      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        setError("Izin akses ke galeri diperlukan untuk memilih gambar");
        return null;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      setImageUri(asset.uri);
      setImageName(`image_${Date.now()}.jpg`);

      return {
        uri: asset.uri,
        name: `image_${Date.now()}.jpg`,
        size: asset.width * asset.height,
        mimeType: "image/jpeg",
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memilih gambar";
      setError(errorMessage);
      console.error("[ImagePicker Error]", err);
      return null;
    }
  };

  const uploadImage = async (
    pickedImage?: ImagePickerResult,
  ): Promise<string | null> => {
    const imageToUpload = pickedImage?.uri || imageUri;

    if (!imageToUpload) {
      setError("Silakan pilih gambar terlebih dahulu");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const uploadedImageUrl =
        await ImageUploadService.uploadImage(imageToUpload);
      return uploadedImageUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal upload gambar";
      setError(errorMessage);
      console.error("[ImageUpload Error]", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImageUri(null);
    setImageName(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    imageUri,
    imageName,
    isLoading,
    error,
    pickImage,
    uploadImage,
    clearImage,
    clearError,
  };
};
