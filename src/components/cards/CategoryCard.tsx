//
// ======================
// Imports & Dependencies
// ======================
//
import React from "react";
import { Link } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "@/theme";

//
// ======================
// Layout Constants
// ======================
//
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_MARGIN = 6;
const CONTAINER_PADDING = 12;
// Hitung lebar card agar 2 kolom muat dalam grid
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_MARGIN * 2) / 2;

//
// ======================
// Type Definitions
// ======================
//
interface Props {
  id: string;
  name: string;
  icon: string;
}

//
// ======================
// Category Card Component
// ======================
//
const CategoryCardComponent: React.FC<Props> = ({ id, name, icon }) => {
  const { colors, radius, shadows } = useTheme();

  return (
    <Link
      href={{
        pathname: "/products/category/[id]",
        params: {
          id,
          name,
        },
      }}
      asChild
    >
      <Pressable style={StyleSheet.flatten([styles.container, { width: CARD_WIDTH, backgroundColor: colors.card, borderRadius: radius.lg, ...shadows.md }])}>
        {/* Category Icon */}
        <View style={[styles.iconContainer, { backgroundColor: colors.background, borderRadius: radius.full }]}>
          <Image
            source={{ uri: icon }}
            style={styles.icon}
            contentFit="contain"
            transition={200}
          />
        </View>

        {/* Category Name */}
        <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
      </Pressable>
    </Link>
  );
};

//
// ======================
// Memoization & Export
// ======================
//
export const CategoryCard = React.memo(CategoryCardComponent);
CategoryCard.displayName = "CategoryCard";

export default CategoryCard;

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  // -- Card Layout --
  container: {
    marginHorizontal: 6,
    marginBottom: 14,
    paddingVertical: 24,
    alignItems: "center",
  },

  // -- Icon --
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  icon: {
    width: 42,
    height: 42,
  },

  // -- Typography --
  name: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
