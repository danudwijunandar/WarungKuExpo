//
// ======================
// Imports & Dependencies
// ======================
//
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEditModeStore } from "@/store/edit-mode.store";
import { useThemeStore } from "@/store/theme.store";
import { useToastStore } from "@/store/toast.store";
import { useTheme } from "@/theme";
import SettingItem from "../components/SettingItem";
import SettingSection from "../components/SettingSection";

//
// ======================
// Settings Screen (Main)
// ======================
//
export default function SettingsScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { colors, spacing, radius, typography } = useTheme();
  
  const showToast = useToastStore((state) => state.showToast);
  const isEditMode = useEditModeStore((state) => state.isEditMode);
  const setEditMode = useEditModeStore((state) => state.setEditMode);

  // Connect directly to persisted theme store
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  //
  // ======================
  // State
  // ======================
  //
  const [notifications, setNotifications] = useState(true);

  //
  // ======================
  // Handlers
  // ======================
  //
  const handleResetCache = () => {
    Alert.alert(
      "Bersihkan Cache?",
      "Tindakan ini akan menghapus data cache lokal aplikasi. Apakah Anda yakin?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Bersihkan",
          style: "destructive",
          onPress: () => {
            showToast("Cache berhasil dibersihkan!", "success");
          },
        },
      ],
    );
  };

  const handleAboutApp = () => {
    Alert.alert(
      "Tentang WarungKu",
      "WarungKu adalah platform e-commerce modern yang dirancang khusus untuk mempermudah pemesanan barang kebutuhan warung kelontong secara grosir dan instan.\n\n© 2026 WarungKu Team.",
      [{ text: "Tutup" }],
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      "Kebijakan Privasi",
      "WarungKu menjaga dan melindungi seluruh data pengguna dengan aman. Data seperti nama, email, dan aktivitas belanja hanya digunakan untuk meningkatkan pengalaman pengguna di aplikasi.\n\nKami tidak membagikan data pribadi pengguna kepada pihak ketiga tanpa izin.",
      [{ text: "Tutup" }],
    );
  };

  const handleTermsCondition = () => {
    Alert.alert(
      "Syarat & Ketentuan",
      "Dengan menggunakan aplikasi WarungKu, pengguna dianggap telah menyetujui seluruh syarat dan ketentuan yang berlaku.\n\nPengguna wajib menggunakan aplikasi secara bijak dan tidak melakukan tindakan yang merugikan sistem maupun pengguna lainnya.",
      [{ text: "Tutup" }],
    );
  };

  const handleDummyAction = (title: string) => {
    showToast(`${title} clicked (Dummy)`, "info");
  };

  const handleLogout = () => {
    Alert.alert(
      "Keluar dari Akun?",
      "Apakah Anda yakin ingin keluar dari akun WarungKu?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: () => {
            showToast("Berhasil keluar dari akun", "success");
          },
        },
      ],
    );
  };

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
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: colors.textPrimary, fontSize: typography.h1 },
          ]}
        >
          Pengaturan
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing.md },
        ]}
      >
        {/* Section 1: Profile */}
        <SettingSection title="Profil">
          <View
            style={[
              styles.profileCard,
              {
                padding: spacing.md,
                backgroundColor: colors.card,
                borderBottomColor: colors.border + "30",
              },
            ]}
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.primary, borderRadius: radius.full },
              ]}
            >
              <Text style={styles.avatarText}>IC</Text>
            </View>
            <View style={[styles.profileInfo, { marginLeft: spacing.md }]}>
              <Text style={[styles.profileName, { color: colors.textPrimary }]}>
                Ical
              </Text>
              <Text
                style={[styles.profileEmail, { color: colors.textSecondary }]}
              >
                ical@warungku.com
              </Text>
            </View>
          </View>
          <SettingItem
            icon="person-outline"
            iconColor={colors.primary}
            title="Edit Profil"
            subtitle="Perbarui info nama, email, dan telepon"
            onPress={() => handleDummyAction("Edit Profil")}
            hideBorder
          />
        </SettingSection>

        {/* Section 2: Preferences */}
        <SettingSection title="Preferensi">
          <SettingItem
            icon="moon-outline"
            iconColor="#8B5CF6"
            title="Mode Gelap"
            subtitle="Ubah tampilan menjadi mode gelap"
            type="toggle"
            value={darkMode}
            onValueChange={toggleDarkMode}
          />
          <SettingItem
            icon="notifications-outline"
            iconColor="#F59E0B"
            title="Notifikasi"
            subtitle="Aktifkan pemberitahuan promo & info belanja"
            type="toggle"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingItem
            icon="build-outline"
            iconColor="#F97316"
            title="Edit Mode"
            subtitle="Aktifkan untuk mengelola dan menghapus produk"
            type="toggle"
            value={isEditMode}
            onValueChange={setEditMode}
            hideBorder
          />
        </SettingSection>

        {/* Section 3: Application */}
        <SettingSection title="Aplikasi">
          <SettingItem
            icon="trash-bin-outline"
            iconColor={colors.danger}
            title="Bersihkan Cache"
            subtitle="Kosongkan penyimpanan cache untuk performa lebih cepat"
            type="button"
            onPress={handleResetCache}
          />
          <SettingItem
            icon="information-circle-outline"
            iconColor={colors.primary}
            title="Tentang Aplikasi"
            subtitle="Pelajari lebih lanjut tentang WarungKu"
            type="button"
            onPress={handleAboutApp}
          />
          <SettingItem
            icon="git-branch-outline"
            iconColor={colors.textSecondary}
            title="Versi Aplikasi"
            type="value"
            rightValue="v1.0.0 (Build 42)"
            hideBorder
          />
        </SettingSection>

        {/* Section 4: Support */}
        <SettingSection title="Bantuan & Ketentuan">
          <SettingItem
            icon="shield-checkmark-outline"
            iconColor="#10B981"
            title="Kebijakan Privasi"
            onPress={handlePrivacyPolicy}
          />

          <SettingItem
            icon="document-text-outline"
            iconColor="#3B82F6"
            title="Syarat & Ketentuan"
            onPress={handleTermsCondition}
            hideBorder
          />
        </SettingSection>

        {/* Section 5: Account */}
        <SettingSection title="Akun">
          <SettingItem
            icon="log-out-outline"
            iconColor={colors.danger}
            title="Keluar Akun"
            subtitle="Logout dari akun saat ini"
            type="button"
            onPress={handleLogout}
            textColor={colors.danger}
            hideBorder
          />
        </SettingSection>
      </ScrollView>
    </SafeAreaView>
  );
}

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  // -- Layout --
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // -- Header --
  header: {},
  headerTitle: {
    fontWeight: "700",
  },
  
  // -- Profile Card --
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileEmail: {
    fontSize: 13,
    marginTop: 2,
  },
});
