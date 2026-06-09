//
// ======================
// Photo Utilities
// ======================
//

import * as FileSystem from "expo-file-system";

/**
 * Convert image file to base64 string
 * Useful for preview or temporary storage
 */
export const convertToBase64 = async (imageUri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error converting to base64:", error);
    throw error;
  }
};

/**
 * Get image file size in MB
 */
export const getImageSizeMB = (sizeInBytes: number): number => {
  return sizeInBytes / (1024 * 1024);
};

/**
 * Check if image size is within allowed limit
 */
export const isImageSizeValid = (
  sizeInBytes: number,
  maxSizeMB: number = 5,
): boolean => {
  return getImageSizeMB(sizeInBytes) <= maxSizeMB;
};

/**
 * Validate image based on size and type
 */
export const validateImage = (
  sizeInBytes?: number,
  type?: string,
  maxSizeMB: number = 5,
): { valid: boolean; error?: string } => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (sizeInBytes && !isImageSizeValid(sizeInBytes, maxSizeMB)) {
    return {
      valid: false,
      error: `Ukuran foto tidak boleh lebih dari ${maxSizeMB}MB`,
    };
  }

  if (type && !allowedTypes.includes(type)) {
    return {
      valid: false,
      error: "Format foto harus JPG atau PNG",
    };
  }

  return { valid: true };
};

/**
 * Get file name from URI
 */
export const getFileNameFromUri = (uri: string): string => {
  return uri.split("/").pop() || "photo.jpg";
};

/**
 * Get file extension from URI
 */
export const getFileExtension = (uri: string): string => {
  const fileName = getFileNameFromUri(uri);
  return fileName.split(".").pop() || "jpg";
};

/**
 * Create placeholder image URI for fallback
 * Returns a simple gradient SVG as data URI
 */
export const getPlaceholderImageUri = (
  initials: string,
  bgColor: string = "#6366F1",
): string => {
  const encodedText = encodeURIComponent(initials);
  return `https://via.placeholder.com/200/${bgColor.replace(
    "#",
    "",
  )}/?text=${encodedText}`;
};
