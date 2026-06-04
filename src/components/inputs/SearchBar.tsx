import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@/theme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderRadius: radius.full, paddingHorizontal: spacing.md, marginTop: spacing.lg }]}>
      <Ionicons name="search" size={20} color={colors.textSecondary} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary + "80"}
        style={[styles.input, { marginLeft: spacing.sm, color: colors.textPrimary }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
});
