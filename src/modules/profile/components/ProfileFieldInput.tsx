//
// ======================
// ProfileFieldInput Component
// ======================
//

import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface ProfileFieldInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  icon?: string;
  type?: "text" | "email";
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

/**
 * Profile Field Input Component
 * Reusable text input with label, validation, and error state
 */
export const ProfileFieldInput: React.FC<ProfileFieldInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  type = "text",
  editable = true,
  multiline = false,
  numberOfLines = 1,
}) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();
  const hasError = !!error;

  return (
    <View style={{ marginBottom: spacing.md }}>
      {/* Label */}
      <Text
        style={[
          styles.label,
          {
            color: colors.textPrimary,
            fontSize: typography.body,
            fontWeight: "600",
            marginBottom: spacing.xs,
          },
        ]}
      >
        {label}
      </Text>

      {/* Input Field */}
      <View
        style={[
          styles.inputWrapper,
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.card,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: hasError ? colors.danger : colors.border,
            paddingHorizontal: spacing.md,
            ...shadows.sm,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={hasError ? colors.danger : colors.textSecondary}
            style={{ marginRight: spacing.sm }}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          editable={editable}
          keyboardType={type === "email" ? "email-address" : "default"}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontSize: typography.body,
              paddingVertical: spacing.md,
              flex: 1,
            },
          ]}
        />

        {/* Validation Icons */}
        {!hasError && value && (
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        )}
        {hasError && (
          <Ionicons name="close-circle" size={20} color={colors.danger} />
        )}
      </View>

      {/* Error Message */}
      {error && (
        <View
          style={{
            marginTop: spacing.xs,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text
            style={[
              styles.errorText,
              {
                color: colors.danger,
                fontSize: typography.caption,
                marginLeft: spacing.xs,
              },
            ]}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

ProfileFieldInput.displayName = "ProfileFieldInput";

const styles = StyleSheet.create({
  label: {
    textAlign: "left",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    padding: 0,
  },
  errorText: {
    fontStyle: "italic",
  },
});

export default ProfileFieldInput;
