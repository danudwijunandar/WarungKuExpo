//
// ======================
// Profile Constants
// ======================
//

/**
 * Photo upload constraints
 */
export const PHOTO_CONSTRAINTS = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/jpg"],
  ALLOWED_EXTENSIONS: ["jpg", "jpeg", "png"],
} as const;

/**
 * Avatar size configurations
 */
export const AVATAR_SIZES = {
  SM: 40,
  MD: 60,
  LG: 80,
  XL: 120,
} as const;

/**
 * Form validation rules
 */
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
} as const;

/**
 * Animation durations
 */
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 400,
  LONG: 600,
} as const;

/**
 * Default colors for avatar (when no photo)
 */
export const DEFAULT_AVATAR_COLORS = [
  "#6366F1", // Indigo
  "#3B82F6", // Blue
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
] as const;

/**
 * Member status badges
 */
export const MEMBER_STATUS = {
  REGULAR: {
    label: "Member Regular",
    icon: "⭐",
    color: "#F59E0B",
  },
  PREMIUM: {
    label: "Member Premium",
    icon: "✨",
    color: "#6366F1",
  },
  VIP: {
    label: "Member VIP",
    icon: "👑",
    color: "#EC4899",
  },
} as const;

/**
 * API simulation delays (in ms)
 */
export const API_DELAYS = {
  FETCH: 800,
  UPDATE: 800,
  UPLOAD_PHOTO: 1500,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  PROFILE_NOT_FOUND: "Profil tidak ditemukan",
  FAILED_TO_UPDATE: "Gagal memperbarui profil",
  FAILED_TO_UPLOAD: "Gagal mengunggah foto",
  INVALID_EMAIL: "Format email tidak valid",
  INVALID_NAME: "Nama tidak valid",
  PERMISSION_DENIED: "Izin ditolak",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: "Profil berhasil diperbarui",
  PHOTO_UPLOADED: "Foto profil berhasil diperbarui",
  LOGOUT_SUCCESS: "Berhasil keluar dari akun",
} as const;
