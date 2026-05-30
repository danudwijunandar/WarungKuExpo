import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, TextInput, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/theme";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={COLORS.textSecondary} />

      <TextInput
        placeholder="Cari produk..."
        style={styles.input}
        placeholderTextColor={COLORS.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    height: 54,
    marginTop: SPACING.lg,
  },

  input: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
});
