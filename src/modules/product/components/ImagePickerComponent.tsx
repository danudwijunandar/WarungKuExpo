import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";

interface ImagePickerComponentProps {
  imageUri: string | null;
  imageName: string | null;
  isLoading: boolean;
  error: string | null;
  onPickImage: () => void;
  onClearImage: () => void;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  imageUri,
  imageName,
  isLoading,
  error,
  onPickImage,
  onClearImage,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text
        style={[
          {
            color: colors.textSecondary,
            marginBottom: spacing.xs,
            fontSize: typography.bodySmall - 1,
            fontWeight: "600",
          },
        ]}
      >
        Gambar Produk
      </Text>

      {/* Image Preview */}
      <View
        style={[
          styles.previewContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderRadius: radius.md,
            padding: spacing.md,
            minHeight: 200,
          },
        ]}
      >
        {imageUri ? (
          <View style={styles.previewWrapper}>
            <Image
              source={{ uri: imageUri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <Pressable
              style={[
                styles.clearButton,
                {
                  backgroundColor: colors.danger + "20",
                  borderRadius: radius.full,
                },
              ]}
              onPress={onClearImage}
              disabled={isLoading}
            >
              <Ionicons name="close" size={20} color={colors.danger} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyPreview}>
            <Ionicons name="image-outline" size={48} color={colors.border} />
            <Text
              style={{
                color: colors.textSecondary,
                marginTop: spacing.sm,
                fontSize: typography.bodySmall,
              }}
            >
              Belum ada gambar dipilih
            </Text>
          </View>
        )}
      </View>

      {/* Pick Image Button */}
      <Pressable
        style={[
          styles.pickButton,
          {
            backgroundColor: colors.primary,
            borderRadius: radius.md,
            paddingVertical: spacing.sm,
            marginTop: spacing.md,
            opacity: isLoading ? 0.6 : 1,
          },
        ]}
        onPress={onPickImage}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <View style={styles.buttonContent}>
            <Ionicons name="images" size={18} color={colors.white} />
            <Text
              style={{
                color: colors.white,
                fontSize: typography.body,
                fontWeight: "600",
                marginLeft: spacing.xs,
              }}
            >
              {imageUri ? "Ubah Gambar" : "Pilih Gambar"}
            </Text>
          </View>
        )}
      </Pressable>

      {/* Error Message */}
      {error && (
        <View
          style={[
            styles.errorContainer,
            {
              backgroundColor: colors.danger + "15",
              borderRadius: radius.sm,
              marginTop: spacing.sm,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
            },
          ]}
        >
          <View style={styles.errorContent}>
            <Ionicons name="alert-circle" size={16} color={colors.danger} />
            <Text
              style={{
                color: colors.danger,
                marginLeft: spacing.xs,
                fontSize: typography.caption,
                flex: 1,
              }}
            >
              {error}
            </Text>
          </View>
        </View>
      )}

      {/* Image Info */}
      {imageName && (
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: typography.caption,
            marginTop: spacing.xs,
          }}
        >
          Nama: {imageName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  previewWrapper: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  clearButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPreview: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  pickButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flexDirection: "row",
  },
  errorContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
