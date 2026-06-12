/**
 * ======================
 * SafeScrollContainer
 * ======================
 *
 * Wrapper component untuk ScrollView content di TabBar screens.
 * Secara otomatis menambahkan bottom padding agar content tidak tertutup
 * oleh Bottom Navigation.
 *
 * Menggunakan safe area inset + TabBar height untuk calculate padding.
 * Tidak ada hardcoded values - semua dynamic.
 */

import { useSafeTabBarHeight } from "@/hooks/useSafeTabBarHeight";
import React, { ReactNode } from "react";
import {
    ScrollView,
    ScrollViewProps,
    StyleSheet,
    ViewStyle,
} from "react-native";

interface SafeScrollContainerProps extends Omit<ScrollViewProps, "style"> {
  children: ReactNode;
  /** Additional container style */
  containerStyle?: ViewStyle;
  /** Whether to apply top safe area padding (default: true) */
  topSafeArea?: boolean;
}

/**
 * SafeScrollContainer - ScrollView dengan automatic bottom padding
 */
export const SafeScrollContainer = React.memo(
  ({
    children,
    containerStyle,
    topSafeArea = true,
    contentContainerStyle,
    showsVerticalScrollIndicator = false,
    ...props
  }: SafeScrollContainerProps) => {
    const { contentBottomPadding } = useSafeTabBarHeight();

    // Merge bottom padding dengan existing contentContainerStyle
    const mergedContentStyle: ViewStyle = [
      styles.contentContainer,
      {
        paddingBottom: contentBottomPadding,
      },
      contentContainerStyle,
    ];

    return (
      <ScrollView
        {...props}
        style={containerStyle}
        contentContainerStyle={mergedContentStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </ScrollView>
    );
  },
);

SafeScrollContainer.displayName = "SafeScrollContainer";

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});
