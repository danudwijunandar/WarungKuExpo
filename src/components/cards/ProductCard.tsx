import Ionicons from "@expo/vector-icons/Ionicons";

import { Link } from "expo-router";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/theme";

import { useCartStore } from "@/store/cart.store";

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, title, image, price }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link
      href={{
        pathname: "/product/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.price}>Rp {price.toLocaleString("id-ID")}</Text>

            <Pressable
              style={styles.cartButton}
              onPress={(e) => {
                e.stopPropagation();

                addToCart({
                  id,
                  title,
                  image,
                  price,
                });
              }}
            >
              <Ionicons name="cart" size={16} color={COLORS.white} />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.md,

    overflow: "hidden",

    marginBottom: SPACING.md,

    marginHorizontal: 6,

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 4,
  },

  image: {
    width: "100%",
    height: 120,

    resizeMode: "cover",
  },

  content: {
    padding: SPACING.sm,

    minHeight: 95,

    justifyContent: "space-between",
  },

  title: {
    fontSize: 13,

    fontWeight: "600",

    color: COLORS.text,

    lineHeight: 18,
  },

  footer: {
    marginTop: SPACING.sm,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  price: {
    flex: 1,

    fontSize: 14,

    fontWeight: "700",

    color: COLORS.primary,
  },

  cartButton: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",
  },
});
