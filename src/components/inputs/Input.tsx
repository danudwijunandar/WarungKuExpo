import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "@/theme";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  onFocus,
  onBlur,
  placeholderTextColor,
  ...props
}) => {
  const { colors, spacing, radius, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
              marginBottom: spacing.xs,
              fontSize: typography.bodySmall - 1,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={placeholderTextColor || colors.textSecondary + "80"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          {
            color: colors.textPrimary,
            backgroundColor: colors.card,
            borderColor: error ? colors.danger : isFocused ? colors.primary : colors.border,
            borderRadius: radius.md,
            paddingVertical: spacing.md - 4,
            paddingHorizontal: spacing.md,
            fontSize: typography.bodySmall,
          },
          style,
        ]}
        {...props}
      />
      {error && (
        <Text
          style={[
            styles.error,
            {
              color: colors.danger,
              marginTop: spacing.xs,
              fontSize: typography.caption,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 14,
  },
  label: {
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
  },
  error: {
    fontWeight: "500",
  },
});
