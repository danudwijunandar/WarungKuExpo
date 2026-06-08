//
// ======================
// Imports & Dependencies
// ======================
//
import React, { useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "@/theme";
import { useQuantityModalStore } from "@/store/quantity-modal.store";
import { useDeleteProduct } from "@/modules/product/hooks/useDeleteProduct";
import DeleteConfirmDialog from "@/components/feedback/DeleteConfirmDialog";

//
// ======================
// Layout Constants
// ======================
//
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_MARGIN = 6;
const CONTAINER_PADDING = 16;
// Hitung lebar card agar 2 kolom muat dalam grid
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_MARGIN * 2) / 2;

//
// ======================
// Type Definitions
// ======================
//
interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
  stock?: number;
}

//
// ======================
// Product Card Component
// ======================
//
const ProductCardComponent: React.FC<Props> = ({ id, title, image, price, stock }) => {
  const router = useRouter();
  const { colors, spacing, radius, shadows, isEditMode } = useTheme();
  const openModal = useQuantityModalStore((state) => state.openModal);
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Validasi stock product
  const isOutOfStock = stock !== undefined && stock <= 0;

  //
  // ======================
  // Event Handlers
  // ======================
  //

  // Handle delete product via API
  const handleDelete = useCallback(() => {
    deleteProduct(id, {
      onSuccess: () => setShowDeleteDialog(false),
      onError: () => setShowDeleteDialog(false),
    });
  }, [id, deleteProduct]);

  // Handle open quantity modal untuk add to cart
  const handleOpenQuantityModal = useCallback((e: any) => {
    e.stopPropagation();
    openModal({ id, title, image, price, stock });
  }, [id, title, image, price, stock, openModal]);

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <>
      <Link
        href={{
          pathname: "/product/[id]",
          params: { id },
        }}
        asChild
      >
        <Pressable style={StyleSheet.flatten([styles.card, { width: CARD_WIDTH, backgroundColor: colors.card, borderRadius: radius.md, marginBottom: spacing.md, ...shadows.md }])}>
          {/* Badge Edit & Delete (hanya tampil di edit mode) */}
          {isEditMode && (
            <View style={styles.actionBadges}>
              {/* Navigate ke halaman edit product */}
              <Pressable
                style={({ pressed }) => [
                  styles.actionBadgeButton,
                  { backgroundColor: colors.primary },
                  pressed && styles.pressed,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  router.push({
                    pathname: "/product/edit/[id]",
                    params: { id },
                  });
                }}
                hitSlop={6}
              >
                <Ionicons name="pencil" size={11} color={colors.white} />
              </Pressable>

              {/* Trigger delete confirmation dialog */}
              <Pressable
                style={({ pressed }) => [
                  styles.actionBadgeButton,
                  { backgroundColor: colors.danger },
                  pressed && styles.pressed,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                hitSlop={6}
              >
                <Ionicons name="close" size={14} color={colors.white} />
              </Pressable>
            </View>
          )}

          {/* Product Image */}
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />

          {/* Product Info: Title, Stock, Price, Cart Button */}
          <View style={[styles.content, { padding: spacing.sm + 2 }]}>
            <View>
              <Text numberOfLines={2} style={[styles.title, { color: colors.textPrimary }]}>
                {title}
              </Text>
              {stock !== undefined && (
                <Text style={[styles.stock, { color: colors.textSecondary }]}>
                  Stock: {stock}
                </Text>
              )}
            </View>

            <View style={[styles.footer, { marginTop: spacing.sm + 2 }]}>
              <Text style={[styles.price, { color: colors.primary }]}>
                Rp {price.toLocaleString("id-ID")}
              </Text>

              {/* Cart button: disabled ketika stok habis */}
              <Pressable
                style={[
                  styles.cartButton,
                  { backgroundColor: isOutOfStock ? colors.border : colors.primary },
                ]}
                onPress={handleOpenQuantityModal}
                disabled={isOutOfStock}
              >
                <Ionicons name="cart" size={16} color={colors.white} />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        visible={showDeleteDialog}
        productName={title}
        isLoading={isPending}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

//
// ======================
// Memoization & Export
// ======================
//
export const ProductCard = React.memo(ProductCardComponent);
ProductCard.displayName = "ProductCard";

export default ProductCard;

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  // -- Card Layout --
  card: {
    marginHorizontal: CARD_MARGIN / 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    minHeight: 105,
    justifyContent: "space-between",
  },

  // -- Typography --
  title: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  stock: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
    letterSpacing: 0.1,
  },
  price: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },

  // -- Footer & Actions --
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  // -- Edit Mode Badges --
  actionBadges: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    flexDirection: "row",
    gap: 4,
  },
  // Deduplicated: editButton & deleteButton shared identical styles
  actionBadgeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // -- Press State --
  pressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
});
