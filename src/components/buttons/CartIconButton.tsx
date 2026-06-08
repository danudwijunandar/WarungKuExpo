import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useCartStore } from "@/store/cart.store";
import { useTheme } from "@/theme";

interface CartIconButtonProps {
  size?: number;
  color?: string;
}

export default function CartIconButton({ size = 24, color }: CartIconButtonProps) {
  const { colors } = useTheme();
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handlePress = useCallback(() => {
    router.push("/cart");
  }, []);

  const iconColor = color ?? colors.textPrimary;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel="Keranjang belanja"
      accessibilityRole="button"
    >
      <Ionicons name="bag-handle-outline" size={size} color={iconColor} />
      {totalQuantity > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.danger }]}>
          <Text style={styles.badgeText}>
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 12,
  },
});
