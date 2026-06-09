//
// ======================
// PhotoPreviewModal Component
// ======================
//

import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface PhotoPreviewModalProps {
  visible: boolean;
  photoUri: string | null;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Photo Preview Modal Component
 * Displays selected photo with confirm/cancel options
 */
export const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  visible,
  photoUri,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  if (!photoUri) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Overlay */}
      <View style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]}>
        {/* Modal Content */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
              borderRadius: radius.lg,
              ...shadows.lg,
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.header,
              {
                paddingHorizontal: spacing.md,
                paddingTop: spacing.md,
                paddingBottom: spacing.sm,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                  fontSize: typography.h2,
                  fontWeight: "700",
                },
              ]}
            >
              Preview Foto
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.bodySmall,
                  marginTop: spacing.xs,
                },
              ]}
            >
              Pastikan foto terlihat bagus sebelum disimpan
            </Text>
          </View>

          {/* Photo Preview */}
          <View
            style={[
              styles.photoContainer,
              {
                marginHorizontal: spacing.md,
                marginVertical: spacing.md,
                borderRadius: radius.md,
                overflow: "hidden",
                backgroundColor: colors.card,
              },
            ]}
          >
            <Image
              source={{ uri: photoUri }}
              style={styles.photo}
              contentFit="cover"
              transition={200}
            />

            {isLoading && (
              <View
                style={[
                  styles.loadingOverlay,
                  { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                ]}
              >
                <ActivityIndicator size="large" color={colors.white} />
                <Text
                  style={[
                    {
                      color: colors.white,
                      marginTop: spacing.md,
                      fontSize: typography.bodySmall,
                    },
                  ]}
                >
                  Mengunggah foto...
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View
            style={[
              styles.buttonContainer,
              {
                paddingHorizontal: spacing.md,
                paddingBottom: spacing.md,
                gap: spacing.sm,
              },
            ]}
          >
            {/* Cancel Button */}
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md,
                },
                pressed && styles.pressed,
              ]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Ionicons name="close" size={20} color={colors.textPrimary} />
              <Text
                style={[
                  {
                    color: colors.textPrimary,
                    fontSize: typography.body,
                    fontWeight: "600",
                    marginLeft: spacing.sm,
                  },
                ]}
              >
                Batal
              </Text>
            </Pressable>

            {/* Confirm Button */}
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.confirmButton,
                {
                  backgroundColor: colors.primary,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md,
                  opacity: isLoading ? 0.6 : 1,
                },
                pressed && !isLoading && styles.pressed,
              ]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color={colors.white} />
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
                    Gunakan Foto Ini
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

PhotoPreviewModal.displayName = "PhotoPreviewModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    maxHeight: "80%",
    width: "100%",
    maxWidth: 400,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "left",
  },
  subtitle: {
    textAlign: "left",
  },
  photoContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {},
  confirmButton: {},
  pressed: {
    opacity: 0.7,
  },
});

export default PhotoPreviewModal;
