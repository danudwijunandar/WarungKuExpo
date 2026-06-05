import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";
import { HistoryTransaction } from "../types/history.types";
import { formatDateId, formatRupiah } from "../utils/history.utils";

interface HistoryItemCardProps {
  transaction: HistoryTransaction;
  onPress: () => void;
}

export default function HistoryItemCard({ transaction, onPress }: HistoryItemCardProps) {
  const { colors, spacing, radius, typography, shadows } = useTheme();
  
  const firstItem = transaction.items[0];
  const totalQuantity = transaction.totalItems;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          borderColor: colors.border,
          padding: spacing.md,
          marginBottom: spacing.md,
          ...shadows.sm,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {/* Header card: ID & Status */}
      <View style={styles.header}>
        <View style={styles.trxInfo}>
          <Ionicons name="receipt-outline" size={16} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={[styles.trxId, { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: "700" }]}>
            {transaction.id}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: colors.success + "15" }]}>
          <Text style={[styles.statusText, { color: colors.success, fontSize: typography.caption }]}>
            Selesai
          </Text>
        </View>
      </View>

      {/* Date */}
      <Text style={[styles.date, { color: colors.textSecondary, fontSize: typography.caption, marginBottom: spacing.sm }]}>
        {formatDateId(transaction.createdAt)}
      </Text>

      <View style={styles.divider} />

      {/* Product preview and details */}
      <View style={[styles.body, { marginTop: spacing.sm }]}>
        {firstItem && (
          <Image
            source={{ uri: firstItem.image }}
            style={[styles.thumbnail, { borderRadius: radius.sm }]}
            contentFit="cover"
            transition={150}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text
            style={[styles.productName, { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: "600" }]}
            numberOfLines={1}
          >
            {firstItem ? firstItem.title : "Produk Belanja"}
          </Text>
          {transaction.items.length > 1 && (
            <Text style={[styles.extraProducts, { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 }]}>
              + {transaction.items.length - 1} produk lainnya
            </Text>
          )}
          
          <View style={[styles.priceInfo, { marginTop: spacing.xs }]}>
            <Text style={[styles.totalItems, { color: colors.textSecondary, fontSize: typography.caption }]}>
              {totalQuantity} barang
            </Text>
            <Text style={[styles.totalPrice, { color: colors.primary, fontSize: typography.bodySmall, fontWeight: "700" }]}>
              {formatRupiah(transaction.totalPrice)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  trxInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  trxId: {
    letterSpacing: 0.3,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusText: {
    fontWeight: "600",
  },
  date: {
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    lineHeight: 18,
  },
  extraProducts: {
    fontWeight: "500",
  },
  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalItems: {
    fontWeight: "500",
  },
  totalPrice: {
    textAlign: "right",
  },
});
