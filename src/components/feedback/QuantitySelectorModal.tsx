//
// ======================
// Imports & Dependencies
// ======================
//
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { useTheme } from "@/theme";
import { useCartStore } from "@/store/cart.store";
import { useQuantityModalStore } from "@/store/quantity-modal.store";
import { useProductById } from "@/modules/product/hooks/useProductById";

//
// ======================
// Quantity Selector Modal (Root)
// ======================
//
// Entry point: renders Modal wrapper + delegates content
// to QuantitySelectorModalContent when product is available.
export default function QuantitySelectorModal() {
  const { visible, product, closeModal } = useQuantityModalStore();

  if (!product) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeModal}
    >
      <QuantitySelectorModalContent
        key={product.id}
        product={product}
        closeModal={closeModal}
      />
    </Modal>
  );
}

//
// ======================
// Type Definitions
// ======================
//
interface ContentProps {
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    stock?: number;
  };
  closeModal: () => void;
}

//
// ======================
// Modal Content Component
// ======================
//
function QuantitySelectorModalContent({ product, closeModal }: ContentProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { colors, spacing, radius, typography } = useTheme();

  //
  // ======================
  // Fetch Product & Stock Logic
  // ======================
  //
  // Fetch product detail for fresh stock check
  // (atau fallback untuk item yang tidak punya stock info, e.g. Favorites)
  const { data: fetchedProduct, isLoading: isProductLoading } = useProductById(
    product.id
  );

  const stockFromProp = product.stock;
  const stockFromFetch = fetchedProduct?.stock;
  // Prioritas stock: prop > fetched > default 0
  const availableStock =
    stockFromProp !== undefined
      ? stockFromProp
      : stockFromFetch !== undefined
      ? stockFromFetch
      : 0;

  //
  // ======================
  // Quantity State & Handlers
  // ======================
  //
  const [quantity, setQuantity] = useState(1);
  const [qtyText, setQtyText] = useState("1");

  // Handle input text change - keep raw string in TextInput
  const handleQtyTextChange = (text: string) => {
    setQtyText(text);

    if (text === "") {
      setQuantity(0);
      return;
    }

    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      setQuantity(parsed);
    } else {
      setQuantity(0);
    }
  };

  // Validasi dan koreksi quantity saat input blur
  const handleBlur = () => {
    let finalQty = quantity;
    if (quantity < 1 || isNaN(quantity)) {
      finalQty = 1;
    } else if (quantity > availableStock && availableStock > 0) {
      finalQty = availableStock;
    }
    setQuantity(finalQty);
    setQtyText(finalQty.toString());
  };

  // Increment quantity (max = available stock)
  const handleIncrement = () => {
    if (quantity < availableStock) {
      const nextQty = quantity + 1;
      setQuantity(nextQty);
      setQtyText(nextQty.toString());
    }
  };

  // Decrement quantity (min = 1)
  const handleDecrement = () => {
    if (quantity > 1) {
      const nextQty = quantity - 1;
      setQuantity(nextQty);
      setQtyText(nextQty.toString());
    }
  };

  //
  // ======================
  // Cart Logic
  // ======================
  //

  // Handle add product to cart
  const handleConfirm = () => {
    if (isAddDisabled) return;

    addToCart(
      {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      },
      quantity
    );
    closeModal();
  };

  //
  // ======================
  // Computed Values
  // ======================
  //
  const subtotal = product.price * quantity;
  const isStockEmpty = availableStock <= 0;
  const isOverStock = quantity > availableStock;
  const isInvalidQty = quantity < 1 || isNaN(quantity);
  const isAddDisabled = isStockEmpty || isOverStock || isInvalidQty;

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <Pressable
          style={[
            styles.bottomSheet,
            {
              backgroundColor: colors.card,
              borderTopLeftRadius: radius.lg + 8,
              borderTopRightRadius: radius.lg + 8,
              padding: spacing.lg,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
            {/* Header / Product Summary */}
            <View style={styles.header}>
              <Image
                source={{ uri: product.image }}
                style={[styles.productImage, { borderRadius: radius.md }]}
                contentFit="cover"
              />
              <View style={styles.productDetails}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.productTitle,
                    { color: colors.textPrimary, fontSize: typography.body },
                  ]}
                >
                  {product.title}
                </Text>
                <Text
                  style={[
                    styles.productPrice,
                    { color: colors.primary, fontSize: typography.bodySmall, marginTop: 4 },
                  ]}
                >
                  Rp {product.price.toLocaleString("id-ID")}
                </Text>
              </View>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border, marginVertical: spacing.md },
              ]}
            />

            {/* Stock Details */}
            <View style={styles.rowAlign}>
              <Text
                style={[
                  styles.label,
                  { color: colors.textSecondary, fontSize: typography.bodySmall },
                ]}
              >
                Stok Tersedia
              </Text>
              {isProductLoading && stockFromProp === undefined ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text
                  style={[
                    styles.stockValue,
                    {
                      color: isStockEmpty ? colors.danger : colors.textPrimary,
                      fontSize: typography.bodySmall,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {availableStock} pcs
                </Text>
              )}
            </View>

            {/* Quantity Selector */}
            <View style={[styles.qtySection, { marginVertical: spacing.md }]}>
              <Text
                style={[
                  styles.label,
                  { color: colors.textSecondary, fontSize: typography.bodySmall },
                ]}
              >
                Jumlah Pembelian
              </Text>

              <View style={styles.qtySelector}>
                {/* Decrement Button */}
                <Pressable
                  disabled={quantity <= 1 || isStockEmpty}
                  style={({ pressed }) => [
                    styles.qtyBtn,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                      borderRadius: radius.sm,
                    },
                    (quantity <= 1 || isStockEmpty) && styles.disabledBtn,
                    pressed && styles.pressed,
                  ]}
                  onPress={handleDecrement}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={quantity <= 1 || isStockEmpty ? colors.border : colors.textPrimary}
                  />
                </Pressable>

                {/* Quantity Input */}
                <TextInput
                  keyboardType="numeric"
                  value={qtyText}
                  onChangeText={handleQtyTextChange}
                  onBlur={handleBlur}
                  editable={!isStockEmpty}
                  style={[
                    styles.qtyInput,
                    {
                      color: colors.textPrimary,
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                      borderRadius: radius.sm,
                      fontSize: typography.body,
                    },
                    isStockEmpty && styles.disabledInput,
                  ]}
                />

                {/* Increment Button */}
                <Pressable
                  disabled={quantity >= availableStock || isStockEmpty}
                  style={({ pressed }) => [
                    styles.qtyBtn,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                      borderRadius: radius.sm,
                    },
                    (quantity >= availableStock || isStockEmpty) && styles.disabledBtn,
                    pressed && styles.pressed,
                  ]}
                  onPress={handleIncrement}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={
                      quantity >= availableStock || isStockEmpty
                        ? colors.border
                        : colors.textPrimary
                    }
                  />
                </Pressable>
              </View>
            </View>

            {/* Warning Messages */}
            {isStockEmpty && (
              <View style={[styles.warningBox, { backgroundColor: colors.danger + "10", borderRadius: radius.sm, padding: spacing.sm }]}>
                <Ionicons name="alert-circle" size={16} color={colors.danger} />
                <Text style={[styles.warningText, { color: colors.danger, fontSize: typography.caption }]}>
                  Maaf, stok produk ini telah habis.
                </Text>
              </View>
            )}

            {!isStockEmpty && isOverStock && (
              <View style={[styles.warningBox, { backgroundColor: colors.danger + "10", borderRadius: radius.sm, padding: spacing.sm }]}>
                <Ionicons name="alert-circle" size={16} color={colors.danger} />
                <Text style={[styles.warningText, { color: colors.danger, fontSize: typography.caption }]}>
                  Jumlah pembelian melebihi stok yang tersedia!
                </Text>
              </View>
            )}

            {/* Subtotal */}
            <View style={[styles.subtotalRow, { marginTop: spacing.md, marginBottom: spacing.lg }]}>
              <Text style={[styles.subtotalLabel, { color: colors.textPrimary, fontSize: typography.body }]}>
                Subtotal
              </Text>
              <Text style={[styles.subtotalValue, { color: colors.primary, fontSize: typography.h2 }]}>
                Rp {subtotal.toLocaleString("id-ID")}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={[styles.actions, { gap: spacing.md }]}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionBtn,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                    paddingVertical: spacing.md,
                  },
                  pressed && styles.pressed,
                ]}
                onPress={closeModal}
              >
                <Text style={[styles.cancelText, { color: colors.textPrimary }]}>Batal</Text>
              </Pressable>

              <Pressable
                disabled={isAddDisabled}
                style={({ pressed }) => [
                  styles.actionBtn,
                  {
                    backgroundColor: colors.primary,
                    borderRadius: radius.md,
                    paddingVertical: spacing.md,
                  },
                  isAddDisabled && styles.disabledConfirmBtn,
                  !isAddDisabled && pressed && styles.pressed,
                ]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>Tambah ke Cart</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    );
  }

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  // -- Layout --
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  // -- Header --
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 60,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  productTitle: {
    fontWeight: "700",
    lineHeight: 18,
  },
  productPrice: {
    fontWeight: "700",
  },
  closeButton: {
    padding: 4,
  },

  // -- Divider --
  divider: {
    height: 1,
  },

  // -- Stock Info --
  rowAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
  },
  stockValue: {
    // Dynamic color applied inline
  },

  // -- Quantity Selector --
  qtySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    textAlign: "center",
    padding: 0,
    fontWeight: "600",
  },

  // -- Warning Messages --
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  warningText: {
    fontWeight: "500",
    flex: 1,
  },

  // -- Subtotal --
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtotalLabel: {
    fontWeight: "600",
  },
  subtotalValue: {
    fontWeight: "800",
  },

  // -- Action Buttons --
  actions: {
    flexDirection: "row",
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  cancelText: {
    fontWeight: "700",
    fontSize: 15,
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  // -- State Modifiers --
  pressed: {
    opacity: 0.75,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  disabledInput: {
    opacity: 0.5,
  },
  disabledConfirmBtn: {
    backgroundColor: "#9CA3AF",
    opacity: 0.6,
  },
});
