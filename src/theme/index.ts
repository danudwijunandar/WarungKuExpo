import { useEditModeStore } from "@/store/edit-mode.store";
import { useThemeStore } from "@/store/theme.store";
import React, { createContext, useContext } from "react";
import { COLORS } from "./colors";
import { DARK_COLORS } from "./dark-colors";
import { RADIUS } from "./radius";
import { SHADOWS } from "./shadows";
import { SPACING } from "./spacing";
import { TYPOGRAPHY } from "./typography";

export * from "./colors";
export * from "./dark-colors";
export * from "./radius";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";

export interface ThemeColors {
  readonly primary: string;
  readonly background: string;
  readonly card: string;
  readonly border: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly danger: string;
  readonly success: string;
  readonly warning: string;
  readonly surface: string;
  readonly white: string;
  readonly black: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: typeof SPACING;
  radius: typeof RADIUS;
  typography: typeof TYPOGRAPHY;
  shadows: typeof SHADOWS;
  isDark: boolean;
  isEditMode: boolean;
}

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const isEditMode = useEditModeStore((state) => state.isEditMode);

  const colors: ThemeColors = darkMode ? DARK_COLORS : COLORS;

  const theme: Theme = {
    colors,
    spacing: SPACING,
    radius: RADIUS,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    isDark: darkMode,
    isEditMode,
  };

  return React.createElement(ThemeContext.Provider, { value: theme }, children);
};

export const useTheme = (): Theme => {
  // Call hooks unconditionally to satisfy React's Rules of Hooks
  const darkMode = useThemeStore((state) => state.darkMode);
  const isEditMode = useEditModeStore((state) => state.isEditMode);
  const colors: ThemeColors = darkMode ? DARK_COLORS : COLORS;
  const fallbackTheme: Theme = {
    colors,
    spacing: SPACING,
    radius: RADIUS,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    isDark: darkMode,
    isEditMode,
  };

  const context = useContext(ThemeContext);
  return context ?? fallbackTheme;
};
