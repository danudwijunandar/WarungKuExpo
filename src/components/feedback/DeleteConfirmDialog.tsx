import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";

interface DeleteConfirmDialogProps {
  visible: boolean;
  productName?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  visible,
  productName,
  isLoading = false,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          style={[styles.dialog, { backgroundColor: colors.card, borderRadius: radius.lg + 4, padding: spacing.xl }]}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: colors.danger + "12", marginBottom: spacing.md }]}>
            <Ionicons name="trash-outline" size={28} color={colors.danger} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: colors.textPrimary, marginBottom: spacing.xs }]}>Hapus produk ini?</Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: colors.textSecondary, marginBottom: spacing.xl, paddingHorizontal: spacing.sm }]}>
            {productName
              ? `"${productName}" akan dihapus dari daftar.`
              : "Produk akan dihapus dari daftar."}
          </Text>

          {/* Actions */}
          <View style={[styles.actions, { gap: spacing.sm }]}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.md, paddingVertical: spacing.md },
                pressed && styles.buttonPressed,
              ]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={[styles.cancelText, { color: colors.textPrimary }]}>Batal</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.danger, borderRadius: radius.md, paddingVertical: spacing.md },
                pressed && styles.deleteButtonPressed,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text style={styles.deleteText}>
                {isLoading ? "Menghapus..." : "Hapus"}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  dialog: {
    width: "100%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  deleteButtonPressed: {
    backgroundColor: "#DC2626",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
