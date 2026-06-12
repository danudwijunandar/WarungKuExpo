//
// ======================
// Imports & Dependencies
// ======================
//
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "../hooks/use-cart";
// eslint-disable-next-line import/no-named-as-default
import { SafeFlatListContainer } from "@/components/wrappers";
import { useToastStore } from "@/store/toast.store";
import { useTheme } from "@/theme";
import CartItemCard from "../components/CartItemCard";

//
// ======================
// Cart Screen (Main)
// ======================
//
export default function CartScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const {
    items,
    selectedCount,
    selectedTotal,
    isSelected,
    isAllSelected,
    toggleSelection,
    toggleSelectAll,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const { colors, spacing, radius, typography, shadows } = useTheme();
  const showToast = useToastStore((s) => s.showToast);

  //
  // ======================
  // State
  // ======================
  //
  const [isCheckingOut] = useState(false);

  //
  // ======================
  // Computed Values
  // ======================
  //
  const hasItems = items.length > 0;
  const hasSelection = selectedCount > 0;

  //
  // ======================
  // Handlers
  // ======================
  //

  // Kosongkan keranjang dengan konfirmasi
  const handleClearCart = useCallback(() => {
    Alert.alert(
      "Kosongkan Keranjang?",
      "Semua barang akan dihapus dari keranjang.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Kosongkan",
          style: "destructive",
          onPress: () => {
            clearCart();
            showToast("Keranjang berhasil dikosongkan", "success");
          },
        },
      ],
    );
  }, [clearCart, showToast]);

  // Navigate ke checkout page jika ada item terpilih
  const handleCheckout = useCallback(() => {
    if (!hasSelection) return;
    router.push("/checkout");
  }, [hasSelection]);

  //
  // ======================
  // Render Helpers
  // ======================
  //

  // Render individual cart item card
  const renderCartItem = useCallback(
    ({ item }: { item: any }) => (
      <CartItemCard
        item={item}
        selected={isSelected(item.id)}
        onToggleSelect={() => toggleSelection(item.id)}
        onIncrease={() => increaseQty(item.id)}
        onDecrease={() => decreaseQty(item.id)}
        onDelete={() => {
          removeFromCart(item.id);
          showToast("Barang dihapus dari keranjang", "success");
        }}
      />
    ),
    [
      isSelected,
      toggleSelection,
      increaseQty,
      decreaseQty,
      removeFromCart,
      showToast,
    ],
  );

  // Render komponen saat keranjang kosong
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyIconWrapper,
          { backgroundColor: colors.card, ...shadows.sm },
        ]}
      >
        <Ionicons name="cart-outline" size={60} color={colors.textSecondary} />
      </View>
      <Text
        style={[
          styles.emptyTitle,
          {
            color: colors.textPrimary,
            fontSize: typography.h3,
            marginBottom: spacing.xs,
          },
        ]}
      >
        Keranjang Kosong
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Belum ada barang di keranjangmu. Yuk, mulai belanja!
      </Text>
    </View>
  );

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header Section */}
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xs,
            paddingBottom: spacing.sm,
          },
        ]}
      >
        <View style={styles.headerTitleRow}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
              marginRight: spacing.sm,
            })}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.textPrimary}
            />
          </Pressable>
          <View>
            <Text
              style={[
                styles.title,
                { color: colors.textPrimary, fontSize: typography.h1 },
              ]}
            >
              Keranjang
            </Text>
            {hasItems && (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {items.length} barang · {selectedCount} dipilih
              </Text>
            )}
          </View>
        </View>
        {hasItems && (
          <Pressable
            style={[
              styles.clearBtn,
              { borderColor: colors.danger, borderRadius: radius.sm },
            ]}
            onPress={handleClearCart}
          >
            <Text style={[styles.clearBtnText, { color: colors.danger }]}>
              Hapus Semua
            </Text>
          </Pressable>
        )}
      </View>

      {/* Select All Bar */}
      {hasItems && (
        <Pressable
          style={[
            styles.selectAllBar,
            {
              marginHorizontal: spacing.md,
              marginBottom: spacing.sm,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              backgroundColor: colors.card,
              borderRadius: radius.md,
              borderColor: colors.border,
            },
          ]}
          onPress={toggleSelectAll}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: colors.border,
                backgroundColor: isAllSelected ? colors.primary : colors.card,
              },
            ]}
          >
            {isAllSelected && (
              <Ionicons name="checkmark" size={14} color={colors.white} />
            )}
          </View>
          <Text
            style={[
              styles.selectAllText,
              { marginLeft: spacing.sm, color: colors.textPrimary },
            ]}
          >
            {isAllSelected ? "Batalkan Semua" : "Pilih Semua"}
          </Text>
          {hasSelection && (
            <View
              style={[
                styles.selectionBadge,
                {
                  backgroundColor: colors.primary + "15",
                  borderRadius: radius.full,
                  paddingHorizontal: spacing.sm,
                },
              ]}
            >
              <Text
                style={[styles.selectionBadgeText, { color: colors.primary }]}
              >
                {selectedCount} dipilih
              </Text>
            </View>
          )}
        </Pressable>
      )}

      {/* Cart List */}
      <SafeFlatListContainer
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: spacing.md },
          !hasItems && styles.listContentEmpty,
        ]}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={renderEmpty}
        renderItem={renderCartItem}
      />

      {/* Sticky Footer */}
      {hasItems && (
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: spacing.lg,
            },
          ]}
        >
          <View style={[styles.totalArea, { marginRight: spacing.md }]}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
              Total {hasSelection ? `(${selectedCount} barang)` : ""}
            </Text>
            <Text
              style={[
                styles.totalPrice,
                { color: colors.textPrimary, fontSize: typography.h2 },
              ]}
            >
              {hasSelection
                ? `Rp ${selectedTotal.toLocaleString("id-ID")}`
                : "—"}
            </Text>
          </View>

          <Pressable
            style={[
              styles.checkoutBtn,
              {
                backgroundColor: colors.primary,
                borderRadius: radius.md,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
              },
              !hasSelection && { backgroundColor: colors.border },
            ]}
            onPress={handleCheckout}
            disabled={!hasSelection || isCheckingOut}
          >
            {isCheckingOut ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={[styles.checkoutText, { color: colors.white }]}>
                {hasSelection ? `Checkout (${selectedCount})` : "Pilih Barang"}
              </Text>
            )}
          </Pressable>
        </View>
      )}
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
  safeArea: {
    flex: 1,
  },

  // -- Header --
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  clearBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // -- Select All Bar --
  selectAllBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  selectionBadge: {
    paddingVertical: 3,
  },
  selectionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // -- List --
  listContent: {},
  listContentEmpty: {
    flex: 1,
  },

  // -- Empty State --
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  emptyIconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  // -- Footer --
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  totalArea: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  totalPrice: {
    fontWeight: "700",
    marginTop: 2,
  },
  checkoutBtn: {
    minWidth: 140,
    alignItems: "center",
    elevation: 2,
  },
  checkoutText: {
    fontWeight: "700",
    fontSize: 14,
  },
});
