import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { useProductById } from "../hooks/useProductById";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useCartStore } from "@/store/cart.store";
import { useTheme } from "@/theme";

import AppButton from "@/components/buttons/AppButton";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import DeleteConfirmDialog from "@/components/feedback/DeleteConfirmDialog";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { colors, spacing, radius, typography, isEditMode } = useTheme();

  const { data, isLoading, refetch } = useProductById(id as string);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const addToCart = useCartStore((state) => state.addToCart);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteProduct = useCallback(() => {
    deleteProduct(id as string, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        router.dismissAll();
        router.replace("/");
      },
      onError: () => setShowDeleteDialog(false),
    });
  }, [id, deleteProduct]);

  const handleAddToCart = useCallback(() => {
    if (!data) return;
    addToCart({
      id: data.id,
      title: data.name,
      image: data.image,
      price: data.price,
    });
  }, [data, addToCart]);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.textPrimary, marginBottom: spacing.md }}>Produk tidak ditemukan</Text>
          <Pressable
            style={{ backgroundColor: colors.primary, padding: spacing.sm, borderRadius: radius.sm }}
            onPress={() => router.back()}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>Kembali</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.image }} style={styles.image} contentFit="cover" transition={200} />
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { backgroundColor: colors.card + "E0", borderColor: colors.border },
              pressed && styles.pressed,
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        <View style={[styles.content, { padding: spacing.lg }]}>
          <Text style={[styles.name, { color: colors.textPrimary, fontSize: typography.h2 }]}>{data.name}</Text>

          <Text style={[styles.brand, { color: colors.textSecondary, marginTop: spacing.xs }]}>{data.brand}</Text>

          <Text style={[styles.price, { color: colors.primary, marginTop: spacing.md, fontSize: typography.h1 }]}>
            Rp {data.price.toLocaleString("id-ID")}
          </Text>

          <View style={[styles.infoContainer, { marginTop: spacing.md }]}>
            <Text style={[styles.infoLabel, { color: colors.textPrimary, width: 80 }]}>Stock</Text>
            <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{data.stock}</Text>
          </View>

          <View style={[styles.infoContainer, { marginTop: spacing.md }]}>
            <Text style={[styles.infoLabel, { color: colors.textPrimary, width: 80 }]}>Expired</Text>
            <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{data.expiredDate}</Text>
          </View>

          <Text style={[styles.descriptionTitle, { color: colors.textPrimary, marginTop: spacing.xl, marginBottom: spacing.sm, fontSize: typography.h3 }]}>Description</Text>

          <Text style={[styles.description, { color: colors.textPrimary, fontSize: typography.bodySmall }]}>{data.description}</Text>

          <View style={[styles.buttonContainer, { marginTop: spacing.xl }]}>
            <View style={styles.actionRow}>
              <View style={[styles.cartButtonWrapper, { marginRight: spacing.md }]}>
                <AppButton title="Add To Cart" onPress={handleAddToCart} />
              </View>
              <View style={[styles.favoriteButtonWrapper, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.md }]}>
                <FavoriteButton
                  id={data.id}
                  title={data.name}
                  image={data.image}
                  price={data.price}
                  size={26}
                  color={colors.danger}
                />
              </View>
            </View>

            <Pressable
              style={[styles.viewFavoritesButton, { borderColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md, marginTop: spacing.md }]}
              onPress={() => router.push("/favorite")}
            >
              <Text style={[styles.viewFavoritesText, { color: colors.primary, fontSize: typography.body }]}>Lihat Favorit</Text>
            </Pressable>

            {/* Admin actions in Edit Mode */}
            {isEditMode && (
              <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md },
                    pressed && styles.pressed,
                  ]}
                  onPress={() => router.push({
                    pathname: "/product/edit/[id]",
                    params: { id: data.id },
                  })}
                >
                  <Ionicons name="pencil-outline" size={18} color={colors.white} />
                  <Text style={[styles.actionBtnText, { color: colors.white, fontSize: typography.body }]}>Edit Produk</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    { backgroundColor: colors.danger, borderRadius: radius.md, paddingVertical: spacing.md },
                    pressed && styles.pressed,
                  ]}
                  onPress={() => setShowDeleteDialog(true)}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.white} />
                  <Text style={[styles.actionBtnText, { color: colors.white, fontSize: typography.body }]}>Hapus Produk</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <DeleteConfirmDialog
        visible={showDeleteDialog}
        productName={data?.name}
        isLoading={isDeleting}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
      />
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 320,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {},
  name: {
    fontWeight: "700",
  },
  brand: {
    fontSize: 14,
  },
  price: {
    fontWeight: "700",
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
  },
  descriptionTitle: {
    fontWeight: "700",
  },
  description: {
    lineHeight: 24,
  },
  buttonContainer: {},
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartButtonWrapper: {
    flex: 1,
  },
  favoriteButtonWrapper: {
    width: 50,
    height: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewFavoritesButton: {
    borderWidth: 1,
    alignItems: "center",
  },
  viewFavoritesText: {
    fontWeight: "600",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionBtnText: {
    fontWeight: "600",
  },
});
