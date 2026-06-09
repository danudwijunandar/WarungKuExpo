//
// ======================
// Detail Profile Screen
// ======================
//

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProfileStore } from "@/store/profile.store";
import { useToastStore } from "@/store/toast.store";
import { useTheme } from "@/theme";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileInfoSection from "../components/ProfileInfoSection";
import { useProfile } from "../hooks/useProfile";
import { formatDateIndonesian } from "../utils/profile.utils";

//
// ======================
// Detail Profile Screen (Main)
// ======================
//
export default function DetailProfileScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { colors, spacing, radius, typography, shadows } = useTheme();
  const router = useRouter();

  const { user, stats, isLoading, refetch } = useProfile();
  const logout = useProfileStore((state) => state.logout);
  const showToast = useToastStore((state) => state.showToast);

  //
  // ======================
  // State
  // ======================
  //
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  //
  // ======================
  // Handlers
  // ======================
  //

  const handleEditProfile = useCallback(() => {
    router.push("/profile/edit");
  }, [router]);

  const handleLogout = useCallback(() => {
    setShowLogoutConfirm(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);

    // Simulate logout delay
    setTimeout(() => {
      logout();
      showToast("Berhasil keluar dari akun", "success");
      setIsLoggingOut(false);
      router.replace("/");
    }, 600);
  }, [logout, showToast, router]);

  //
  // ======================
  // Render Loading State
  // ======================
  //
  if (isLoading && !user) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["top"]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!user || !stats) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["top"]}
      >
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.textPrimary, marginBottom: spacing.md }}>
            Profil tidak ditemukan
          </Text>
          <Pressable
            style={[
              {
                backgroundColor: colors.primary,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                borderRadius: radius.sm,
              },
            ]}
            onPress={() => refetch()}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              Coba Lagi
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xs,
            paddingBottom: spacing.md,
          },
        ]}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.textPrimary,
              fontSize: typography.h2,
              flex: 1,
              textAlign: "center",
            },
          ]}
        >
          Profil Saya
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
        ]}
      >
        {/* Profile Header Section */}
        <View
          style={[
            styles.avatarSection,
            { alignItems: "center", marginBottom: spacing.lg },
          ]}
        >
          <ProfileAvatar
            photoUrl={user.photoUrl}
            name={user.name}
            size="xl"
            editable={false}
          />
        </View>

        {/* Profile Info Section */}
        <ProfileInfoSection
          name={user.name}
          email={user.email}
          joinedDate={formatDateIndonesian(user.joinedAt)}
          totalTransactions={stats.totalTransactions}
          totalSpent={stats.totalSpent}
        />

        {/* Action Buttons Section */}
        <View
          style={[
            styles.buttonSection,
            { marginTop: spacing.xl, gap: spacing.md },
          ]}
        >
          {/* Edit Profile Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: colors.primary,
                borderRadius: radius.md,
                paddingVertical: spacing.md,
                ...shadows.md,
              },
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil-outline" size={20} color={colors.white} />
            <Text
              style={[
                {
                  color: colors.white,
                  fontSize: typography.body,
                  fontWeight: "600",
                  marginLeft: spacing.sm,
                },
              ]}
            >
              Edit Profil
            </Text>
          </Pressable>

          {/* Logout Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: colors.danger,
                borderRadius: radius.md,
                paddingVertical: spacing.md,
                ...shadows.md,
              },
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={colors.white}
                />
                <Text
                  style={[
                    {
                      color: colors.white,
                      fontSize: typography.body,
                      fontWeight: "600",
                      marginLeft: spacing.sm,
                    },
                  ]}
                >
                  Logout
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <View style={[styles.modal, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.background,
                borderRadius: radius.lg,
                ...shadows.lg,
              },
            ]}
          >
            <Text
              style={[
                {
                  color: colors.textPrimary,
                  fontSize: typography.h3,
                  fontWeight: "700",
                  marginBottom: spacing.sm,
                  textAlign: "center",
                },
              ]}
            >
              Keluar Akun?
            </Text>
            <Text
              style={[
                {
                  color: colors.textSecondary,
                  fontSize: typography.body,
                  textAlign: "center",
                  marginBottom: spacing.lg,
                  lineHeight: 20,
                },
              ]}
            >
              Apakah Anda yakin ingin keluar dari akun WarungKu?
            </Text>

            <View style={[styles.modalButtons, { gap: spacing.sm }]}>
              <Pressable
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: radius.md,
                    paddingVertical: spacing.md,
                  },
                ]}
                onPress={() => setShowLogoutConfirm(false)}
                disabled={isLoggingOut}
              >
                <Text
                  style={[
                    {
                      color: colors.textPrimary,
                      fontSize: typography.body,
                      fontWeight: "600",
                    },
                  ]}
                >
                  Batal
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.danger,
                    borderRadius: radius.md,
                    paddingVertical: spacing.md,
                  },
                ]}
                onPress={confirmLogout}
                disabled={isLoggingOut}
              >
                <Text
                  style={[
                    {
                      color: colors.white,
                      fontSize: typography.body,
                      fontWeight: "600",
                    },
                  ]}
                >
                  Keluar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  avatarSection: {
    marginTop: 20,
  },
  buttonSection: {
    flexDirection: "column",
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    marginHorizontal: 20,
    padding: 20,
    maxWidth: 340,
  },
  modalButtons: {
    flexDirection: "column",
  },
  modalButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
