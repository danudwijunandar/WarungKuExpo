//
// ======================
// Imports & Dependencies
// ======================
//
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "@/theme";

//
// ======================
// Type Definitions
// ======================
//
export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

//
// ======================
// Reusable Input Component
// ======================
//
// Generic text input with label, error state, and focus border.
// Used across forms (Checkout, AddProduct, EditProduct, etc).
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

  // Handle focus state untuk border color
  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  // Handle blur state untuk border color
  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <View style={styles.container}>
      {/* Label */}
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

      {/* Text Input - border color changes on focus/error */}
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

      {/* Error Message */}
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

//
// ======================
// Styles
// ======================
//
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
