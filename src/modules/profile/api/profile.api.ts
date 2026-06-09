//
// ======================
// Profile API Service (Mock)
// ======================
//

import {
    PhotoMetadata,
    Profile,
    UpdateProfileRequest,
    User,
    UserStats,
} from "@/types/profile";

/**
 * Mock user data - initial state
 * In production, this would come from actual backend
 */
const MOCK_USER: User = {
  id: "USR001",
  name: "Ical",
  email: "ical@warungku.com",
  photoUrl: null,
  joinedAt: new Date("2025-01-15").toISOString(),
};

/**
 * Mock stats - simulated transaction data
 */
const MOCK_STATS: UserStats = {
  totalTransactions: 24,
  totalSpent: 1250000,
  joinedDate: "15 Januari 2025",
};

/**
 * Simulate API delay for realistic behavior
 */
const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch complete profile data (user + stats)
 * Simulates: GET /user/profile
 */
export const fetchProfile = async (): Promise<Profile> => {
  await simulateDelay();

  return {
    user: MOCK_USER,
    stats: MOCK_STATS,
  };
};

/**
 * Update user profile (name, email, photo)
 * Simulates: PUT /user/profile/update
 */
export const updateProfile = async (
  updates: UpdateProfileRequest,
): Promise<User> => {
  await simulateDelay();

  // Merge updates with existing user data
  const updatedUser: User = {
    ...MOCK_USER,
    ...updates,
  };

  // In production, save to backend here
  // This is just mock - data won't persist across app reloads without store

  return updatedUser;
};

/**
 * Upload and process profile photo
 * Simulates: POST /user/profile/photo
 * Returns photo URL (in production: would upload to Cloudinary/S3)
 */
export const uploadProfilePhoto = async (
  photo: PhotoMetadata,
): Promise<string> => {
  await simulateDelay(1500); // Photo upload takes longer

  // Mock: return base64 URI or placeholder URL
  // In production: upload to cloud storage, return URL
  if (photo.uri.startsWith("data:") || photo.uri.startsWith("file://")) {
    // Local file converted to base64 or file path
    return photo.uri;
  }

  return photo.uri;
};

/**
 * Get user stats (transactions, spending)
 * Simulates: GET /user/stats
 */
export const fetchUserStats = async (): Promise<UserStats> => {
  await simulateDelay();
  return MOCK_STATS;
};

/**
 * Logout user - clear session
 * Simulates: POST /user/logout
 */
export const logoutUser = async (): Promise<void> => {
  await simulateDelay(500);
  // In production: invalidate JWT token, clear session
};

/**
 * Export mock user for testing purposes
 */
export const getMockUser = () => MOCK_USER;
export const getMockStats = () => MOCK_STATS;
