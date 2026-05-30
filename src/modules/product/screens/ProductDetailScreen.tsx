
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useProductDetail } from "../hooks/use-product-detail";

import { useCartStore } from "@/store/cart.store";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isLoading } = useProductDetail(id);

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading || !data) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: data.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{data.name}</Text>

          <Text style={styles.price}>Rp {data.price}</Text>

          <View style={styles.infoRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Stock {data.stock}</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data.brand}</Text>
            </View>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.description}>{data.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.cartButton}
          onPress={() =>
            addToCart({
              id: data.id,
              title: data.name,
              image: data.image,
              price: data.price,
            })
          }
        >
          <Ionicons name="cart" size={20} color={COLORS.white} />

          <Text style={styles.cartText}>Add To Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },

  content: {
    padding: SPACING.lg,
  },

  title: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: "700",
    color: COLORS.text,
  },

  price: {
    fontSize: TYPOGRAPHY.h1,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: SPACING.sm,
  },

  infoRow: {
    flexDirection: "row",
    marginTop: SPACING.lg,
  },

  badge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },

  badgeText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  descriptionTitle: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },

  description: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },

  cartButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  cartText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: TYPOGRAPHY.body,
    marginLeft: SPACING.sm,
  },
});
