/**
 * ======================
 * useSafeTabBarHeight Hook
 * ======================
 *
 * Hook untuk menghitung tinggi TabBar secara dinamis berdasarkan safe area inset.
 * Memastikan Bottom Navigation selalu berada di area aman pada semua perangkat.
 *
 * Cross-platform support:
 * - Android 3-button navigation (hard buttons)
 * - Android gesture navigation (system inset)
 * - iPhone dengan Home Indicator (safe area bottom)
 * - iPhone tanpa Home Indicator (minimal inset)
 *
 * Tidak ada hardcoded padding/margin. Semua calculation berdasarkan safe area.
 *
 * @returns {Object} - { tabBarStyle, contentBottomPadding, totalHeight }
 */

import { useMemo } from "react";
import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Constants untuk TabBar content
const TABBAR_CONTENT_HEIGHT = 48; // Icon + label height
const TABBAR_PADDING_VERTICAL = 8; // Top + bottom padding content
const TABBAR_BORDER_HEIGHT = 1; // Top border

export interface SafeTabBarDimensions {
  /** TabBar style object untuk digunakan di screenOptions.tabBarStyle */
  tabBarStyle: ViewStyle;
  /** Padding bottom untuk content scroll agar tidak tertutup TabBar */
  contentBottomPadding: number;
  /** Total TabBar height termasuk safe area inset */
  totalHeight: number;
  /** Bottom safe area inset */
  bottomInset: number;
}

/**
 * Main hook - Calculate TabBar dimensions berdasarkan safe area
 */
export function useSafeTabBarHeight(): SafeTabBarDimensions {
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    // Total height content TabBar (icon + label + padding)
    const contentHeight =
      TABBAR_CONTENT_HEIGHT + TABBAR_PADDING_VERTICAL + TABBAR_BORDER_HEIGHT;

    // Total height = content + safe area inset
    const totalHeight = contentHeight + insets.bottom;

    // Style untuk TabBar
    const tabBarStyle: ViewStyle = {
      height: totalHeight,
      paddingBottom: insets.bottom, // Respect safe area bottom inset
      paddingTop: TABBAR_PADDING_VERTICAL / 2,
      borderTopWidth: TABBAR_BORDER_HEIGHT,
    };

    return {
      tabBarStyle,
      contentBottomPadding: totalHeight,
      totalHeight,
      bottomInset: insets.bottom,
    };
  }, [insets.bottom]);
}

/**
 * Helper hook - Get only bottom inset
 * Berguna untuk positioning element lain relative to safe area
 */
export function useSafeAreaBottomInset(): number {
  const insets = useSafeAreaInsets();
  return useMemo(() => insets.bottom, [insets.bottom]);
}
