import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";

export default function HistoryEmptyState() {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: colors.card,
            borderRadius: radius.full,
            ...shadows.sm,
          },
        ]}
      >
        <Ionicons name="receipt-outline" size={60} color={colors.textSecondary} />
      </View>
      <Text
        style={[
          styles.title,
          { color: colors.textPrimary, fontSize: typography.h3, marginBottom: spacing.xs },
        ]}
      >
        Belum Ada Transaksi
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Riwayat pembelian Anda akan tercatat di sini setelah berhasil checkout.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  iconWrapper: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
