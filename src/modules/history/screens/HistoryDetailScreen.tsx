//
// ======================
// Imports & Dependencies
// ======================
//
import React, { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { useTheme } from "@/theme";
import { useHistoryStore } from "@/store/history.store";
import { useToastStore } from "@/store/toast.store";
import { formatDateId, formatRupiah } from "../utils/history.utils";
import DeleteHistoryDialog from "../components/DeleteHistoryDialog";

//
// ======================
// History Detail Screen (Main)
// ======================
//
export default function HistoryDetailScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { id } = useLocalSearchParams();
  const { colors, spacing, radius, typography, shadows } = useTheme();
  
  const transactions = useHistoryStore((s) => s.transactions);
  const deleteTransaction = useHistoryStore((s) => s.deleteTransaction);
  const showToast = useToastStore((s) => s.showToast);

  //
  // ======================
  // State
  // ======================
  //
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //
  // ======================
  // Computed Values
  // ======================
  //
  const transaction = useMemo(() => {
    return transactions.find((tx) => tx.id === id);
  }, [transactions, id]);

  const paymentMethodLabel = useMemo(() => {
    if (!transaction) return "";
    switch (transaction.paymentMethod) {
      case "CASH":
        return "COD (Cash)";
      case "TRANSFER":
        return "Transfer Bank";
      case "E_WALLET":
        return "E-Wallet / Qris";
      default:
        return transaction.paymentMethod;
    }
  }, [transaction]);

  const paymentMethodIcon = useMemo(() => {
    if (!transaction) return "cash-outline";
    switch (transaction.paymentMethod) {
      case "CASH":
        return "cash-outline";
      case "TRANSFER":
        return "card-outline";
      case "E_WALLET":
        return "qr-code-outline";
      default:
        return "cash-outline";
    }
  }, [transaction]);

  //
  // ======================
  // Handlers
  // ======================
  //
  const handleDelete = useCallback(() => {
    if (!transaction) return;
    setIsDeleting(true);
    // Simulate delete latency for visual feedback
    setTimeout(() => {
      deleteTransaction(transaction.id);
      setIsDeleting(false);
      setShowDeleteDialog(false);
      showToast("Riwayat transaksi berhasil dihapus", "success");
      router.back();
    }, 600);
  }, [transaction, deleteTransaction, showToast]);

  //
  // ======================
  // Render Empty State
  // ======================
  //
  if (!transaction) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.notFoundContainer}>
          <Text style={{ color: colors.textPrimary, marginBottom: spacing.md, fontSize: typography.body }}>
            Transaksi tidak ditemukan
          </Text>
          <Pressable
            style={{ backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm }}
            onPress={() => router.back()}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>Kembali</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: typography.h2 }]}>
          Detail Transaksi
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }} showsVerticalScrollIndicator={false}>
        {/* Transaction Status Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: typography.body, fontWeight: "700" }]}>
              Status Transaksi
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.success + "15" }]}>
              <Text style={{ color: colors.success, fontSize: typography.caption, fontWeight: "700" }}>
                Selesai
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary, fontSize: typography.bodySmall }]}>No. Transaksi</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: "600" }]}>{transaction.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary, fontSize: typography.bodySmall }]}>Waktu Transaksi</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: "600" }]}>{formatDateId(transaction.createdAt)}</Text>
          </View>
        </View>

        {/* Product Items List Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: typography.body, fontWeight: "700", marginBottom: spacing.sm }]}>
            Daftar Produk ({transaction.items.length})
          </Text>
          {transaction.items.map((item) => (
            <View key={item.id} style={styles.productRow}>
              <Image
                source={{ uri: item.image }}
                style={[styles.productImage, { borderRadius: radius.sm }]}
                contentFit="cover"
              />
              <View style={styles.productDetails}>
                <Text style={{ color: colors.textPrimary, fontWeight: "600", fontSize: typography.bodySmall }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 }}>
                  {item.quantity} x {formatRupiah(item.price)}
                </Text>
              </View>
              <Text style={{ color: colors.textPrimary, fontWeight: "700", fontSize: typography.bodySmall, alignSelf: "center" }}>
                {formatRupiah(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Summary Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: typography.body, fontWeight: "700", marginBottom: spacing.sm }]}>
            Rincian Pembayaran
          </Text>
          
          <View style={styles.paymentRow}>
            <Text style={{ color: colors.textSecondary, fontSize: typography.bodySmall }}>Metode Pembayaran</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={paymentMethodIcon as any} size={16} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={{ color: colors.textPrimary, fontWeight: "600", fontSize: typography.bodySmall }}>{paymentMethodLabel}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={{ color: colors.textPrimary, fontWeight: "700", fontSize: typography.body }}>Total Pembayaran</Text>
            <Text style={{ color: colors.primary, fontWeight: "700", fontSize: typography.body }}>
              {formatRupiah(transaction.totalPrice)}
            </Text>
          </View>
        </View>

        {/* Action Button: Delete History */}
        <View style={{ marginTop: spacing.md }}>
          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              { borderColor: colors.danger, borderRadius: radius.md, paddingVertical: spacing.md },
              pressed && styles.deleteButtonPressed
            ]}
            onPress={() => setShowDeleteDialog(true)}
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} style={{ marginRight: 8 }} />
            <Text style={{ color: colors.danger, fontWeight: "700", fontSize: typography.bodySmall }}>
              Hapus Riwayat Transaksi
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <DeleteHistoryDialog
        visible={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
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
  // -- Layout --
  container: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // -- Header --
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: 12,
  },
  headerTitle: {
    fontWeight: "700",
  },
  
  // -- Card --
  card: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {},
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginVertical: 12,
  },
  
  // -- Info Rows --
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "500",
  },
  infoValue: {},
  
  // -- Product Row --
  productRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  productImage: {
    width: 48,
    height: 48,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  
  // -- Payment Info --
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  
  // -- Buttons --
  deleteButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  deleteButtonPressed: {
    backgroundColor: "rgba(239, 68, 68, 0.05)",
  },
});
