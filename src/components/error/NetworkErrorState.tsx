import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NetworkErrorStateProps {
  onRetry?: () => void;
}

export const NetworkErrorState: React.FC<NetworkErrorStateProps> = ({ onRetry }) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="wifi-outline" size={48} color={colors.textSecondary} style={{ marginBottom: spacing.xs }} />
      <Text style={[styles.title, { color: colors.textPrimary, fontSize: typography.body, marginBottom: spacing.xs }]}>
        Koneksi Internet Terputus
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.caption }]}>
        Periksa sambungan Wi-Fi atau data seluler Anda dan coba lagi.
      </Text>
      {onRetry && (
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor: colors.primary,
              borderRadius: radius.sm,
              marginTop: spacing.md,
              paddingVertical: spacing.xs + 2,
              paddingHorizontal: spacing.lg,
            },
          ]}
          onPress={onRetry}
        >
          <Text style={{ color: colors.white, fontSize: 13, fontWeight: "600" }}>
            Hubungkan Kembali
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default NetworkErrorState;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 240,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
