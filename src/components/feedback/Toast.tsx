import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useToastStore } from "@/store/toast.store";
import { COLORS, RADIUS, SPACING } from "@/theme";

const { width } = Dimensions.get("window");

export default function Toast() {
  const { visible, message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, hideToast]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle-outline";
      case "error":
        return "alert-circle-outline";
      default:
        return "information-circle-outline";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return COLORS.success;
      case "error":
        return COLORS.danger;
      default:
        return COLORS.primary;
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      exiting={FadeOutUp}
      style={styles.container}
    >
      <View style={styles.toast}>
        <Ionicons name={getIcon()} size={20} color={getIconColor()} />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  message: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: SPACING.sm,
    flex: 1,
  },
});
