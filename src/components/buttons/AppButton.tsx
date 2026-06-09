import { useTheme } from "@/theme";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function AppButton({ title, onPress, disabled = false }: Props) {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled ? colors.border : colors.primary,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
        },
        !disabled && pressed && styles.pressed,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          {
            color: disabled ? colors.textSecondary : colors.white,
            fontSize: typography.body,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
  },
});
