//
// ======================
// useProfile Hook
// ======================
//

import { useProfileStore } from "@/store/profile.store";
import { useEffect } from "react";

/**
 * Custom hook to access and manage profile data
 * Automatically fetches profile on first load if not cached
 */
export const useProfile = () => {
  const user = useProfileStore((state) => state.user);
  const stats = useProfileStore((state) => state.stats);
  const isLoading = useProfileStore((state) => state.isLoading);
  const error = useProfileStore((state) => state.error);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const clearError = useProfileStore((state) => state.clearError);

  // Auto-fetch on mount if not cached
  useEffect(() => {
    if (!user && !isLoading) {
      fetchProfile();
    }
  }, []);

  return {
    user,
    stats,
    isLoading,
    error,
    refetch: fetchProfile,
    clearError,
    isAuthenticated: !!user,
  };
};

export default useProfile;
