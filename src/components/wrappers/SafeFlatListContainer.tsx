/**
 * ======================
 * SafeFlatListContainer
 * ======================
 *
 * Wrapper component untuk FlatList content di TabBar screens.
 * Secara otomatis menambahkan bottom padding agar content tidak tertutup
 * oleh Bottom Navigation.
 *
 * Menggunakan safe area inset + TabBar height untuk calculate padding.
 * Tidak ada hardcoded values - semua dynamic.
 *
 * Usage:
 * ```tsx
 * <SafeFlatListContainer
 *   data={items}
 *   renderItem={renderItem}
 *   keyExtractor={item => item.id}
 * />
 * ```
 */

import { useSafeTabBarHeight } from "@/hooks/useSafeTabBarHeight";
import React from "react";
import { FlatList, FlatListProps, StyleSheet, ViewStyle } from "react-native";

type SafeFlatListContainerProps<T> = Omit<
  FlatListProps<T>,
  "contentContainerStyle"
> & {
  /** Additional content container style */
  contentContainerStyle?: ViewStyle | ViewStyle[];
};

/**
 * SafeFlatListContainer - FlatList dengan automatic bottom padding
 */
export const SafeFlatListContainer = React.memo(
  React.forwardRef<FlatList, SafeFlatListContainerProps<any>>(
    (
      { contentContainerStyle, showsVerticalScrollIndicator = false, ...props },
      ref,
    ) => {
      const { contentBottomPadding } = useSafeTabBarHeight();

      // Merge bottom padding dengan existing contentContainerStyle
      const mergedContentStyle: ViewStyle | ViewStyle[] = [
        styles.contentContainer,
        {
          paddingBottom: contentBottomPadding,
        },
        contentContainerStyle || {},
      ];

      return (
        <FlatList
          ref={ref}
          {...props}
          contentContainerStyle={mergedContentStyle}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        />
      );
    },
  ),
);

SafeFlatListContainer.displayName = "SafeFlatListContainer";

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});
