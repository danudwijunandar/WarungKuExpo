import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ErrorFallbackProps {
  error: any;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={[styles.iconWrapper, { backgroundColor: colors.danger + "15", borderRadius: radius.full }]}>
        <Ionicons name="alert-circle-outline" size={60} color={colors.danger} />
      </View>
      
      <Text style={[styles.title, { color: colors.textPrimary, fontSize: typography.h2, marginBottom: spacing.xs }]}>
        Terjadi Kesalahan
      </Text>
      
      <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.bodySmall, marginBottom: spacing.lg }]}>
        Aplikasi mengalami gangguan tidak terduga. Silakan coba memuat ulang halaman.
      </Text>

      {__DEV__ && (
        <ScrollView style={[styles.devBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md }]}>
          <Text style={[styles.devTitle, { color: colors.danger, fontSize: typography.caption }]}>
            Error Details (Dev Mode Only):
          </Text>
          <Text style={[styles.devText, { color: colors.textPrimary, fontSize: 11 }]}>
            {error.toString()}
          </Text>
          {error.stack && (
            <Text style={[styles.devStack, { color: colors.textSecondary, fontSize: 10, marginTop: spacing.xs }]}>
              {error.stack}
            </Text>
          )}
        </ScrollView>
      )}

      <Pressable
        style={[styles.retryBtn, { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md }]}
        onPress={resetErrorBoundary}
      >
        <Text style={[styles.retryText, { color: colors.white, fontSize: typography.body }]}>
          Coba Lagi
        </Text>
      </Pressable>
    </View>
  );
};

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 20,
  },
  devBox: {
    maxHeight: 180,
    width: "100%",
    borderWidth: 1,
    marginBottom: 24,
  },
  devTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  devText: {
    fontFamily: "monospace",
  },
  devStack: {
    fontFamily: "monospace",
  },
  retryBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: {
    fontWeight: "700",
  },
});
