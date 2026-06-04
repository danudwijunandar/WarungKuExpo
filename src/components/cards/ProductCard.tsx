import React, { useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "@/theme";
import { useCartStore } from "@/store/cart.store";
import { useDeleteProduct } from "@/modules/product/hooks/useDeleteProduct";
import DeleteConfirmDialog from "@/components/feedback/DeleteConfirmDialog";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_MARGIN = 6;
const CONTAINER_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_MARGIN * 2) / 2;

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
  stock?: number;
}

const ProductCardComponent: React.FC<Props> = ({ id, title, image, price, stock }) => {
  const router = useRouter();
  const { colors, spacing, radius, shadows, isEditMode } = useTheme();
  const addToCart = useCartStore((state) => state.addToCart);
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = useCallback(() => {
    deleteProduct(id, {
      onSuccess: () => setShowDeleteDialog(false),
      onError: () => setShowDeleteDialog(false),
    });
  }, [id, deleteProduct]);

  const handleAddToCart = useCallback((e: any) => {
    e.stopPropagation();
    addToCart({
      id,
      title,
      image,
      price,
    });
  }, [id, title, image, price, addToCart]);

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
          {/* Delete badge in edit mode */}
          {isEditMode && (
            <View style={styles.actionBadges}>
              <Pressable
                style={({ pressed }) => [
                  styles.editButton,
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
              
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
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

          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />

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

              <Pressable
                style={[styles.cartButton, { backgroundColor: colors.primary }]}
                onPress={handleAddToCart}
              >
                <Ionicons name="cart" size={16} color={colors.white} />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>

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

export const ProductCard = React.memo(ProductCardComponent);
ProductCard.displayName = "ProductCard";

export default ProductCard;

const styles = StyleSheet.create({
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  cartButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBadges: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    flexDirection: "row",
    gap: 4,
  },
  deleteButton: {
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
  editButton: {
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
  pressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
});
