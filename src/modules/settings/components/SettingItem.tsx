import React from "react";
import { Pressable, StyleSheet, Text, View, Switch } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/theme";

interface SettingItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  title: string;
  subtitle?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  type?: "link" | "toggle" | "button" | "value";
  rightValue?: string;
  hideBorder?: boolean;
  textColor?: string;
}

export default function SettingItem({
  icon,
  iconColor,
  title,
  subtitle,
  value,
  onValueChange,
  onPress,
  type = "link",
  rightValue,
  hideBorder = false,
  textColor,
}: SettingItemProps) {
  const { colors, spacing, radius } = useTheme();
  const isToggle = type === "toggle";
  const activeIconColor = iconColor || colors.textSecondary;

  const content = (
    <View style={[
      styles.container,
      {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomColor: colors.border + "50",
        borderBottomWidth: hideBorder ? 0 : 1,
      }
    ]}>
      <View style={[styles.iconContainer, { backgroundColor: activeIconColor + "15", borderRadius: radius.sm }]}>
        <Ionicons name={icon} size={18} color={activeIconColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor || colors.textPrimary }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>

      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.primary + "50" }}
          thumbColor={value ? colors.primary : colors.textSecondary}
        />
      ) : (
        <View style={styles.rightContainer}>
          {rightValue && <Text style={[styles.rightText, { color: colors.textSecondary, marginRight: spacing.xs }]}>{rightValue}</Text>}
          {type === "link" && (
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          )}
        </View>
      )}
    </View>
  );

  if (isToggle) {
    return <View style={{ backgroundColor: colors.card }}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? colors.background : colors.card }
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {},
});
