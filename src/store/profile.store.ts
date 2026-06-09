//
// ======================
// Profile Zustand Store
// ======================
//

import { useToastStore } from "@/store/toast.store";
import { UpdateProfileRequest, User, UserStats } from "@/types/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as profileApi from "../api/profile.api";

/**
 * Profile state interface
 * Manages user data, stats, and loading states
 */
interface ProfileState {
  // Data
  user: User | null;
  stats: UserStats | null;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;

  // Error handling
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setStats: (stats: UserStats | null) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: UpdateProfileRequest) => Promise<void>;
  uploadPhoto: (photoUri: string) => Promise<string>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Profile store with AsyncStorage persistence
 * Automatically syncs to local storage for offline access
 */
export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // -- Initial State --
      user: null,
      stats: null,
      isLoading: false,
      isSaving: false,
      isUploading: false,
      error: null,

      // -- Setters --
      setUser: (user) => set({ user }),
      setStats: (stats) => set({ stats }),

      // -- Fetch Profile --
      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await profileApi.fetchProfile();
          set({
            user: data.user,
            stats: data.stats,
            isLoading: false,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Gagal memuat profil";
          set({ error: message, isLoading: false });
          useToastStore.getState().showToast(message, "error");
        }
      },

      // -- Update Profile --
      updateProfile: async (updates) => {
        const currentUser = get().user;
        if (!currentUser) {
          set({ error: "Profil tidak ditemukan" });
          return;
        }

        // Optimistic update
        const optimisticUser = { ...currentUser, ...updates };
        set({ user: optimisticUser, isSaving: true, error: null });

        try {
          const updatedUser = await profileApi.updateProfile(updates);
          set({
            user: updatedUser,
            isSaving: false,
          });
          useToastStore
            .getState()
            .showToast("Profil berhasil diperbarui", "success");
        } catch (err) {
          // Revert optimistic update on error
          const message =
            err instanceof Error ? err.message : "Gagal memperbarui profil";
          set({
            user: currentUser,
            error: message,
            isSaving: false,
          });
          useToastStore.getState().showToast(message, "error");
        }
      },

      // -- Upload Photo --
      uploadPhoto: async (photoUri: string) => {
        set({ isUploading: true, error: null });
        try {
          const photoUrl = await profileApi.uploadProfilePhoto({
            uri: photoUri,
          });

          // Optimistic update with new photo
          set((state) => ({
            user: state.user ? { ...state.user, photoUrl } : null,
            isUploading: false,
          }));

          useToastStore
            .getState()
            .showToast("Foto profil berhasil diperbarui", "success");
          return photoUrl;
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Gagal mengunggah foto";
          set({ error: message, isUploading: false });
          useToastStore.getState().showToast(message, "error");
          throw err;
        }
      },

      // -- Logout --
      logout: () => {
        set({
          user: null,
          stats: null,
          error: null,
          isLoading: false,
          isSaving: false,
          isUploading: false,
        });
      },

      // -- Error Handling --
      clearError: () => set({ error: null }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user and stats, not loading states
      partialize: (state) => ({
        user: state.user,
        stats: state.stats,
      }),
    },
  ),
);
