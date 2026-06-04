import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = "Terjadi Kesalahan", onRetry }) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={40} color={colors.danger} style={{ marginBottom: spacing.xs }} />
      <Text style={[styles.text, { color: colors.textPrimary, fontSize: typography.bodySmall }]}>
        {message}
      </Text>
      {onRetry && (
        <Pressable
          style={[
            styles.btn,
            {
              borderColor: colors.primary,
              borderRadius: radius.sm,
              marginTop: spacing.sm,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.md,
            },
          ]}
          onPress={onRetry}
        >
          <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}>
            Ulangi
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
  btn: {
    borderWidth: 1,
  },
});
