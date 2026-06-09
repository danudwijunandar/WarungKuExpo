//
// ======================
// useProfilePhoto Hook
// ======================
//

import { useProfileStore } from "@/store/profile.store";
import { useToastStore } from "@/store/toast.store";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

/**
 * Photo selection result from image picker
 */
export interface PhotoResult {
  uri: string;
  width: number;
  height: number;
  size?: number;
  type?: string;
}

/**
 * Custom hook for profile photo selection and upload
 * Handles permissions, picker logic, and upload
 */
export const useProfilePhoto = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const uploadPhoto = useProfileStore((state) => state.uploadPhoto);
  const showToast = useToastStore((state) => state.showToast);

  /**
   * Request camera roll permissions
   */
  const requestPermissions = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Permission error:", error);
      return false;
    }
  }, []);

  /**
   * Pick image from gallery
   */
  const pickImage = useCallback(async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        showToast("Akses galeri ditolak", "error");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for avatar
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photo = result.assets[0];
        setSelectedPhoto({
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          size: photo.fileSize,
          type: photo.type || "image",
        });
      }
    } catch (error) {
      console.error("Image picker error:", error);
      showToast("Gagal membuka galeri", "error");
    }
  }, [requestPermissions, showToast]);

  /**
   * Take photo with camera
   */
  const takePhoto = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        showToast("Akses kamera ditolak", "error");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photo = result.assets[0];
        setSelectedPhoto({
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          size: photo.fileSize,
          type: photo.type || "image",
        });
      }
    } catch (error) {
      console.error("Camera error:", error);
      showToast("Gagal membuka kamera", "error");
    }
  }, [showToast]);

  /**
   * Confirm and upload selected photo
   */
  const confirmPhoto = useCallback(
    async (photoUri: string) => {
      if (!photoUri) return;

      setIsProcessing(true);
      try {
        const newPhotoUrl = await uploadPhoto(photoUri);
        setSelectedPhoto(null);
        return newPhotoUrl;
      } catch (error) {
        console.error("Photo upload error:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [uploadPhoto],
  );

  /**
   * Cancel photo selection
   */
  const cancelPhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  return {
    selectedPhoto,
    isProcessing,
    pickImage,
    takePhoto,
    confirmPhoto,
    cancelPhoto,
  };
};

export default useProfilePhoto;
