import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/theme";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingSection({ title, children }: SettingSectionProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }]}>
      <Text style={[styles.title, { color: colors.textSecondary, marginBottom: spacing.xs + 2, paddingHorizontal: spacing.xs }]}>
        {title}
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    overflow: "hidden",
    borderWidth: 1,
  },
});
