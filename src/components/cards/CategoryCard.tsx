import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/theme";

interface Props {
  name: string;
  icon: string;
}

export default function CategoryCard({ name, icon }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>

      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: SPACING.md,
    width: 80,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },

  name: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.caption,
    textAlign: "center",
    color: COLORS.text,
  },
});
