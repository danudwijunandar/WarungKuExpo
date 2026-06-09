//
// ======================
// ProfileInfoSection Component
// ======================
//

import { useTheme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileInfoSectionProps {
  name: string;
  email: string;
  joinedDate: string;
  totalTransactions: number;
  totalSpent: number;
}

/**
 * Profile Info Section Component
 * Displays user profile info and statistics in organized cards
 */
export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  name,
  email,
  joinedDate,
  totalTransactions,
  totalSpent,
}) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  return (
    <View style={{ gap: spacing.md }}>
      {/* Profile Header Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderRadius: radius.md,
            padding: spacing.md,
            ...shadows.sm,
          },
        ]}
      >
        {/* Name */}
        <Text
          style={[
            styles.name,
            {
              color: colors.textPrimary,
              fontSize: typography.h2,
              fontWeight: "700",
              marginBottom: spacing.xs,
            },
          ]}
        >
          {name}
        </Text>

        {/* Email */}
        <View style={[styles.emailRow, { marginBottom: spacing.md }]}>
          <Ionicons
            name="mail-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text
            style={[
              styles.email,
              {
                color: colors.textSecondary,
                fontSize: typography.bodySmall,
                marginLeft: spacing.xs,
              },
            ]}
          >
            {email}
          </Text>
        </View>

        {/* Member Badge */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.primary + "15",
              borderRadius: radius.sm,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.sm,
              alignSelf: "flex-start",
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: colors.primary,
                fontSize: typography.caption,
                fontWeight: "600",
              },
            ]}
          >
            ⭐ Member Regular
          </Text>
        </View>
      </View>

      {/* Statistics Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderRadius: radius.md,
            padding: spacing.md,
            ...shadows.sm,
          },
        ]}
      >
        <Text
          style={[
            styles.statsTitle,
            {
              color: colors.textPrimary,
              fontSize: typography.body,
              fontWeight: "700",
              marginBottom: spacing.md,
            },
          ]}
        >
          Statistik Anda
        </Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Stat 1: Transaksi */}
          <View style={[styles.statItem, { flex: 1 }]}>
            <View
              style={[
                styles.statIconContainer,
                {
                  backgroundColor: colors.primary + "15",
                  borderRadius: radius.md,
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons
                name="receipt-outline"
                size={22}
                color={colors.primary}
              />
            </View>
            <Text
              style={[
                styles.statValue,
                {
                  color: colors.textPrimary,
                  fontSize: typography.h3,
                  fontWeight: "700",
                  marginTop: spacing.xs,
                },
              ]}
            >
              {totalTransactions}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.textSecondary,
                  fontSize: typography.caption,
                },
              ]}
            >
              Transaksi
            </Text>
          </View>

          {/* Stat 2: Total Belanja */}
          <View style={[styles.statItem, { flex: 1 }]}>
            <View
              style={[
                styles.statIconContainer,
                {
                  backgroundColor: colors.success + "15",
                  borderRadius: radius.md,
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons name="card-outline" size={22} color={colors.success} />
            </View>
            <Text
              style={[
                styles.statValue,
                {
                  color: colors.textPrimary,
                  fontSize: typography.h3,
                  fontWeight: "700",
                  marginTop: spacing.xs,
                },
              ]}
            >
              {(totalSpent / 1000000).toFixed(1)}M
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.textSecondary,
                  fontSize: typography.caption,
                },
              ]}
            >
              Total Belanja
            </Text>
          </View>

          {/* Stat 3: Bergabung Sejak */}
          <View style={[styles.statItem, { flex: 1 }]}>
            <View
              style={[
                styles.statIconContainer,
                {
                  backgroundColor: colors.warning + "15",
                  borderRadius: radius.md,
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.warning}
              />
            </View>
            <Text
              style={[
                styles.statValue,
                {
                  color: colors.textPrimary,
                  fontSize: typography.h3,
                  fontWeight: "700",
                  marginTop: spacing.xs,
                },
              ]}
            >
              {joinedDate.split(" ")[0]}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.textSecondary,
                  fontSize: typography.caption,
                },
              ]}
            >
              Bergabung
            </Text>
          </View>
        </View>

        {/* Joined Date Text */}
        <Text
          style={[
            styles.joinedText,
            {
              color: colors.textSecondary,
              fontSize: typography.bodySmall,
              marginTop: spacing.md,
              fontStyle: "italic",
            },
          ]}
        >
          Bergabung pada {joinedDate}
        </Text>
      </View>
    </View>
  );
};

ProfileInfoSection.displayName = "ProfileInfoSection";

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  name: {
    textAlign: "left",
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  email: {
    flex: 1,
  },
  badge: {
    alignItems: "center",
  },
  badgeText: {
    textAlign: "center",
  },
  statsTitle: {
    textAlign: "left",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    textAlign: "center",
  },
  statLabel: {
    textAlign: "center",
    marginTop: 4,
  },
  joinedText: {
    textAlign: "center",
  },
});

export default ProfileInfoSection;
