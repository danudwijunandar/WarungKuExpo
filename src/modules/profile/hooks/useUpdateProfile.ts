//
// ======================
// useUpdateProfile Hook
// ======================
//

import { useProfileStore } from "@/store/profile.store";
import { UpdateProfileRequest } from "@/types/profile";
import { useCallback } from "react";

/**
 * Custom hook for updating user profile
 * Returns mutation function and state
 */
export const useUpdateProfile = () => {
  const isSaving = useProfileStore((state) => state.isSaving);
  const error = useProfileStore((state) => state.error);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const clearError = useProfileStore((state) => state.clearError);

  const mutate = useCallback(
    async (updates: UpdateProfileRequest) => {
      clearError();
      await updateProfile(updates);
    },
    [updateProfile, clearError],
  );

  return {
    mutate,
    isPending: isSaving,
    isLoading: isSaving,
    error,
    reset: clearError,
  };
};

export default useUpdateProfile;
