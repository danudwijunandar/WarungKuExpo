//
// ======================
// ProfileAvatar Component
// ======================
//

import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface ProfileAvatarProps {
  photoUrl: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  editable?: boolean;
  isLoading?: boolean;
  onEdit?: () => void;
}

const AVATAR_SIZES = {
  sm: { container: 40, text: 14, icon: 14 },
  md: { container: 60, text: 20, icon: 18 },
  lg: { container: 80, text: 28, icon: 22 },
  xl: { container: 120, text: 44, icon: 28 },
};

/**
 * Profile Avatar Component
 * Displays user profile picture with fallback to initials
 * Supports loading state and edit overlay
 */
export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  photoUrl,
  name,
  size = "lg",
  editable = false,
  isLoading = false,
  onEdit,
}) => {
  const { colors, radius } = useTheme();
  const sizeConfig = AVATAR_SIZES[size];

  /**
   * Extract initials from name (e.g., "Ical Pratama" -> "IP")
   */
  const getInitials = (fullName: string): string => {
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  };

  const initials = getInitials(name || "User");

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeConfig.container,
          height: sizeConfig.container,
        },
      ]}
    >
      {/* Avatar Background / Image Container */}
      <View
        style={[
          styles.avatarWrapper,
          {
            width: sizeConfig.container,
            height: sizeConfig.container,
            borderRadius: sizeConfig.container / 2,
            backgroundColor: photoUrl ? colors.card : colors.primary,
            borderColor: colors.border,
            overflow: "hidden",
          },
        ]}
      >
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={StyleSheet.flatten([
              styles.image,
              {
                width: sizeConfig.container,
                height: sizeConfig.container,
              },
            ])}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View
            style={StyleSheet.flatten([
              styles.initialsContainer,
              {
                width: sizeConfig.container,
                height: sizeConfig.container,
                justifyContent: "center",
                alignItems: "center",
              },
            ])}
          >
            <Text
              style={[
                styles.initials,
                {
                  fontSize: sizeConfig.text,
                  color: colors.white,
                  fontWeight: "700",
                },
              ]}
            >
              {initials}
            </Text>
          </View>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <View
            style={[
              styles.loadingOverlay,
              { backgroundColor: "rgba(0, 0, 0, 0.4)" },
            ]}
          >
            <ActivityIndicator size="small" color={colors.white} />
          </View>
        )}
      </View>

      {/* Edit Button Overlay */}
      {editable && !isLoading && (
        <Pressable
          style={[
            styles.editButton,
            {
              backgroundColor: colors.primary,
              borderColor: colors.card,
            },
          ]}
          onPress={onEdit}
        >
          <Ionicons name="pencil" size={sizeConfig.icon} color={colors.white} />
        </Pressable>
      )}
    </View>
  );
};

ProfileAvatar.displayName = "ProfileAvatar";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initialsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

export default ProfileAvatar;
