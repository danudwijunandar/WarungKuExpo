import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/theme";

import { useCartStore } from "@/store/cart.store";

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, title, image, price }: Props) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: id },
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.price}>Rp {price}</Text>

        <Pressable
          style={styles.cartButton}
          onPress={() =>
            addToCart({
              id,
              title,
              image,
              price,
            })
          }
        >
          <Ionicons name="cart" size={18} color={COLORS.white} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: SPACING.md,
  },

  title: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.text,
  },

  price: {
    marginTop: SPACING.sm,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: TYPOGRAPHY.h3,
  },

  cartButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: SPACING.md,
    bottom: SPACING.md,
  },
});
