//
// ======================
// Edit Profile Screen
// ======================
//

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProfileStore } from "@/store/profile.store";
import { useTheme } from "@/theme";
import PhotoPreviewModal from "../components/PhotoPreviewModal";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileFieldInput from "../components/ProfileFieldInput";
import { useProfile } from "../hooks/useProfile";
import { useProfilePhoto } from "../hooks/useProfilePhoto";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { validateEmailField, validateName } from "../utils/profile.utils";

//
// ======================
// Edit Profile Screen (Main)
// ======================
//
export default function EditProfileScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { colors, spacing, radius, typography, shadows } = useTheme();
  const router = useRouter();

  const { user } = useProfile();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();
  const {
    selectedPhoto,
    isProcessing: isUploadingPhoto,
    pickImage,
    takePhoto,
    confirmPhoto,
    cancelPhoto,
  } = useProfilePhoto();
  const uploadPhoto = useProfileStore((state) => state.uploadPhoto);

  //
  // ======================
  // State - Form Fields
  // ======================
  //
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || null);

  //
  // ======================
  // State - Form Validation
  // ======================
  //
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  //
  // ======================
  // Handlers
  // ======================
  //

  // Validate name field
  const handleNameChange = useCallback((text: string) => {
    setName(text);
    if (text.trim()) {
      setNameError(validateName(text));
    } else {
      setNameError(null);
    }
  }, []);

  // Validate email field
  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    if (text.trim()) {
      setEmailError(validateEmailField(text));
    } else {
      setEmailError(null);
    }
  }, []);

  // Handle change photo button
  const handleChangePhoto = useCallback(() => {
    Alert.alert("Ubah Foto Profil", "Pilih sumber foto", [
      {
        text: "Galeri",
        onPress: () => {
          pickImage().then(() => setShowPhotoModal(true));
        },
      },
      {
        text: "Kamera",
        onPress: () => {
          takePhoto().then(() => setShowPhotoModal(true));
        },
      },
      { text: "Batal", style: "cancel" },
    ]);
  }, [pickImage, takePhoto]);

  // Confirm photo selection
  const handleConfirmPhoto = useCallback(async () => {
    if (!selectedPhoto) return;

    try {
      const newPhotoUrl = await confirmPhoto(selectedPhoto.uri);
      if (newPhotoUrl) {
        setPhotoUrl(newPhotoUrl);
        setShowPhotoModal(false);
      }
    } catch (error) {
      console.error("Photo confirmation error:", error);
    }
  }, [selectedPhoto, confirmPhoto]);

  // Save profile changes
  const handleSaveProfile = useCallback(async () => {
    // Validate before save
    const nameValidation = validateName(name);
    const emailValidation = validateEmailField(email);

    if (nameValidation) {
      setNameError(nameValidation);
      return;
    }
    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    // Build update payload (only include changed fields)
    const updates: Record<string, any> = {};
    if (name !== user?.name) updates.name = name;
    if (email !== user?.email) updates.email = email;
    if (photoUrl !== user?.photoUrl) updates.photoUrl = photoUrl;

    // If nothing changed, just go back
    if (Object.keys(updates).length === 0) {
      router.back();
      return;
    }

    // Save profile
    await updateProfile(updates);
    router.back();
  }, [name, email, photoUrl, user, updateProfile, router]);

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
              fontWeight: "700",
            },
          ]}
        >
          Edit Profil
        </Text>
        <Pressable
          onPress={handleSaveProfile}
          disabled={isSaving || isUploadingPhoto}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text
              style={[
                {
                  color: colors.primary,
                  fontSize: typography.body,
                  fontWeight: "600",
                },
              ]}
            >
              Simpan
            </Text>
          )}
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
        ]}
      >
        {/* Profile Photo Section */}
        <View
          style={[
            styles.photoSection,
            {
              alignItems: "center",
              marginBottom: spacing.lg,
              paddingVertical: spacing.lg,
            },
          ]}
        >
          <ProfileAvatar
            photoUrl={photoUrl}
            name={name}
            size="lg"
            editable={true}
            isLoading={isUploadingPhoto}
            onEdit={handleChangePhoto}
          />

          <Pressable
            style={[
              styles.changePhotoButton,
              {
                marginTop: spacing.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                backgroundColor: colors.card,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.border,
              },
            ]}
            onPress={handleChangePhoto}
            disabled={isUploadingPhoto}
          >
            <Ionicons name="camera-outline" size={18} color={colors.primary} />
            <Text
              style={[
                {
                  color: colors.primary,
                  fontSize: typography.bodySmall,
                  fontWeight: "600",
                  marginLeft: spacing.xs,
                },
              ]}
            >
              Ganti Foto
            </Text>
          </Pressable>
        </View>

        {/* Form Section */}
        <View
          style={[
            styles.formSection,
            {
              backgroundColor: colors.card,
              borderRadius: radius.md,
              padding: spacing.md,
              ...shadows.sm,
            },
          ]}
        >
          {/* Name Input */}
          <ProfileFieldInput
            label="Nama Lengkap"
            value={name}
            onChangeText={handleNameChange}
            placeholder="Masukkan nama lengkap Anda"
            error={nameError || undefined}
            icon="person-outline"
            type="text"
          />

          {/* Email Input */}
          <ProfileFieldInput
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Masukkan email Anda"
            error={emailError || undefined}
            icon="mail-outline"
            type="email"
          />
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              marginTop: spacing.lg,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              backgroundColor: colors.primary + "10",
              borderLeftWidth: 3,
              borderLeftColor: colors.primary,
              borderRadius: radius.sm,
            },
          ]}
        >
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.primary}
            style={{ marginRight: spacing.sm }}
          />
          <Text
            style={[
              {
                color: colors.textSecondary,
                fontSize: typography.bodySmall,
                flex: 1,
                lineHeight: 18,
              },
            ]}
          >
            Perubahan profil akan disimpan secara otomatis setelah Anda klik
            tombol Simpan
          </Text>
        </View>
      </ScrollView>

      {/* Photo Preview Modal */}
      <PhotoPreviewModal
        visible={showPhotoModal}
        photoUri={selectedPhoto?.uri || null}
        isLoading={isUploadingPhoto}
        onConfirm={handleConfirmPhoto}
        onCancel={cancelPhoto}
      />
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
    textAlign: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  photoSection: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  changePhotoButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formSection: {
    marginTop: 0,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
