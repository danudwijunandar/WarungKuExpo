import React, { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "@/theme";
import { useCartStore } from "@/store/cart.store";
import FavoriteButton from "@/components/buttons/FavoriteButton";

interface FavoriteProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const FavoriteProductCardComponent: React.FC<FavoriteProductCardProps> = ({ id, title, image, price }) => {
  const { colors, spacing, radius, shadows } = useTheme();
  const addToCart = useCartStore((state) => state.addToCart);

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
    <Link
      href={{
        pathname: "/product/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: colors.card, borderRadius: radius.md, marginBottom: spacing.md, ...shadows.md }])}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} contentFit="cover" transition={200} />
          <View style={[styles.favoriteBadge, { top: spacing.xs, right: spacing.xs }]}>
            <FavoriteButton
              id={id}
              title={title}
              image={image}
              price={price}
              size={18}
              color={colors.danger}
            />
          </View>
        </View>

        <View style={[styles.content, { padding: spacing.sm }]}>
          <Text numberOfLines={2} style={[styles.title, { color: colors.textPrimary }]}>
            {title}
          </Text>

          <View style={[styles.footer, { marginTop: spacing.sm }]}>
            <Text style={[styles.price, { color: colors.primary }]}>Rp {price.toLocaleString("id-ID")}</Text>

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
  );
};

export const FavoriteProductCard = React.memo(FavoriteProductCardComponent);
FavoriteProductCard.displayName = "FavoriteProductCard";

export default FavoriteProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 0.485, // prevent item stretching across columns
    overflow: "hidden",
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteBadge: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 100,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    minHeight: 95,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
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
});
