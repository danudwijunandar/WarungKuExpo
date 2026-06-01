import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, TextInput, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "@/theme";

interface Props {
  value: string;

  onChangeText: (text: string) => void;

  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#9CA3AF" />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.full,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: SPACING.md,

    marginTop: SPACING.lg,
  },

  input: {
    flex: 1,

    marginLeft: SPACING.sm,

    fontSize: 15,

    color: COLORS.text,
  },
});
