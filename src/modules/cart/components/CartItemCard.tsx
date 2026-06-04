import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import { CartItem } from "@/store/cart.store";
import { useTheme } from "@/theme";

interface CartItemCardProps {
  item: CartItem;
  selected: boolean;
  onToggleSelect: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const CartItemCardComponent: React.FC<CartItemCardProps> = ({
  item,
  selected,
  onToggleSelect,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const { colors, spacing, radius } = useTheme();

  const handleDecrease = () => {
    if (item.quantity === 1) {
      Alert.alert(
        "Hapus Barang?",
        `Hapus "${item.title}" dari keranjang?`,
        [
          { text: "Batal", style: "cancel" },
          { text: "Hapus", style: "destructive", onPress: onDelete },
        ]
      );
    } else {
      onDecrease();
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          padding: spacing.md,
          marginBottom: spacing.sm,
          borderColor: selected ? colors.primary + "60" : "transparent",
          borderWidth: 1.5,
        },
        selected && { backgroundColor: colors.primary + "0B" },
      ]}
    >
      {/* Checkbox */}
      <Pressable style={[styles.checkboxHitbox, { padding: spacing.xs, marginRight: spacing.sm }]} onPress={onToggleSelect}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected ? colors.primary : colors.card,
            },
          ]}
        >
          {selected && (
            <Ionicons name="checkmark" size={14} color={colors.white} />
          )}
        </View>
      </Pressable>

      {/* Product Image */}
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { borderRadius: radius.md, backgroundColor: colors.background }]}
        contentFit="cover"
        transition={200}
      />

      {/* Content */}
      <View style={[styles.content, { marginLeft: spacing.sm }]}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={[styles.price, { color: colors.textSecondary }]}>Rp {item.price.toLocaleString("id-ID")}</Text>

        <View style={[styles.actions, { marginTop: spacing.sm }]}>
          {/* Quantity Controls */}
          <View style={[styles.qtyRow, { backgroundColor: colors.background, borderRadius: radius.full }]}>
            <Pressable
              style={[styles.qtyButton, { backgroundColor: item.quantity === 1 ? "transparent" : colors.primary }]}
              onPress={handleDecrease}
              hitSlop={6}
            >
              <Ionicons
                name={item.quantity === 1 ? "trash-outline" : "remove"}
                size={16}
                color={item.quantity === 1 ? colors.danger : colors.white}
              />
            </Pressable>

            <Text style={[styles.qty, { marginHorizontal: spacing.sm, color: colors.textPrimary }]}>{item.quantity}</Text>

            <Pressable style={[styles.qtyButton, { backgroundColor: colors.primary }]} onPress={onIncrease} hitSlop={6}>
              <Ionicons name="add" size={16} color={colors.white} />
            </Pressable>
          </View>

          {/* Subtotal for this item */}
          <Text style={[styles.subtotal, { color: colors.primary }]}>
            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const CartItemCard = React.memo(CartItemCardComponent);
CartItemCard.displayName = "CartItemCard";

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxHitbox: {},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 76,
    height: 76,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  qty: {
    fontSize: 14,
    fontWeight: "700",
    minWidth: 20,
    textAlign: "center",
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "700",
  },
});
