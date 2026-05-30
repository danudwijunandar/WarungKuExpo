
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useCartStore } from "@/store/cart.store";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/theme";

export default function CartScreen() {
  const { items, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Cart masih kosong</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.content}>
              <Text style={styles.name}>{item.title}</Text>

              <Text style={styles.price}>Rp {item.price}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() => decreaseQty(item.id)}
                >
                  <Ionicons name="remove" size={18} color={COLORS.white} />
                </Pressable>

                <Text style={styles.qty}>{item.quantity}</Text>

                <Pressable
                  style={styles.qtyButton}
                  onPress={() => increaseQty(item.id)}
                >
                  <Ionicons name="add" size={18} color={COLORS.white} />
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="trash" size={18} color={COLORS.white} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.totalPrice}>Rp {totalPrice}</Text>
          </View>

          <Pressable style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },

  title: {
    fontSize: TYPOGRAPHY.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: "row",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
  },

  content: {
    flex: 1,
    marginLeft: SPACING.md,
  },

  name: {
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

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.md,
  },

  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  qty: {
    marginHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    fontWeight: "700",
  },

  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.danger,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SPACING.lg,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  totalPrice: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: "700",
    color: COLORS.primary,
  },

  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
  },

  checkoutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: TYPOGRAPHY.body,
  },
});
