//
// ======================
// Profile Types & Interfaces
// ======================
//

/**
 * User profile data interface
 * Represents basic user information
 */
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
  joinedAt: string; // ISO date string
}

/**
 * User statistics interface
 * Contains transaction and activity stats
 */
export interface UserStats {
  totalTransactions: number;
  totalSpent: number;
  joinedDate: string; // formatted date
}

/**
 * Complete profile data combining user & stats
 */
export interface Profile {
  user: User;
  stats: UserStats;
}

/**
 * Update profile request payload
 */
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  photoUrl?: string | null;
}

/**
 * Update profile response
 */
export interface UpdateProfileResponse {
  success: boolean;
  data?: User;
  error?: string;
}

/**
 * Photo upload metadata
 */
export interface PhotoMetadata {
  uri: string;
  size?: number;
  type?: string;
  fileName?: string;
}
