import { StyleSheet } from "react-native-unistyles";

// Base spacing and sizing system
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// Typography system
const typography = {
  // Font families
  fonts: {
    regular: "System",
    medium: "System",
    semibold: "System",
    bold: "System",
    mono: "Menlo",
  },

  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
    "6xl": 48,
    "7xl": 60,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    base: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
} as const;

// Shadow system
const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

// Light theme colors
const lightColors = {
  // Primary colors
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },

  // Secondary colors
  secondary: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },

  // Neutral grays
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },

  // Semantic colors
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  // Surface colors
  background: "#ffffff",
  surface: "#f8fafc",
  surfaceVariant: "#f1f5f9",

  // Text colors
  onBackground: "#0f172a",
  onSurface: "#334155",
  onSurfaceVariant: "#64748b",

  // Border colors
  border: "#e2e8f0",
  borderVariant: "#cbd5e1",

  // Special colors
  overlay: "rgba(0, 0, 0, 0.5)",
  disabled: "#94a3b8",
  placeholder: "#94a3b8",
} as const;

// Dark theme colors
const darkColors = {
  // Primary colors (same scale, different context)
  primary: {
    50: "#082f49",
    100: "#0c4a6e",
    200: "#075985",
    300: "#0369a1",
    400: "#0284c7",
    500: "#0ea5e9",
    600: "#38bdf8",
    700: "#7dd3fc",
    800: "#bae6fd",
    900: "#e0f2fe",
    950: "#f0f9ff",
  },

  secondary: {
    50: "#4a044e",
    100: "#701a75",
    200: "#86198f",
    300: "#a21caf",
    400: "#c026d3",
    500: "#d946ef",
    600: "#e879f9",
    700: "#f0abfc",
    800: "#f5d0fe",
    900: "#fae8ff",
    950: "#fdf4ff",
  },

  neutral: {
    50: "#0a0a0a",
    100: "#171717",
    200: "#262626",
    300: "#404040",
    400: "#525252",
    500: "#737373",
    600: "#a3a3a3",
    700: "#d4d4d4",
    800: "#e5e5e5",
    900: "#f5f5f5",
    950: "#fafafa",
  },

  success: {
    50: "#052e16",
    100: "#14532d",
    200: "#166534",
    300: "#15803d",
    400: "#16a34a",
    500: "#22c55e",
    600: "#4ade80",
    700: "#86efac",
    800: "#bbf7d0",
    900: "#dcfce7",
    950: "#f0fdf4",
  },

  warning: {
    50: "#451a03",
    100: "#78350f",
    200: "#92400e",
    300: "#b45309",
    400: "#d97706",
    500: "#f59e0b",
    600: "#fbbf24",
    700: "#fcd34d",
    800: "#fde68a",
    900: "#fef3c7",
    950: "#fffbeb",
  },

  error: {
    50: "#450a0a",
    100: "#7f1d1d",
    200: "#991b1b",
    300: "#b91c1c",
    400: "#dc2626",
    500: "#ef4444",
    600: "#f87171",
    700: "#fca5a5",
    800: "#fecaca",
    900: "#fee2e2",
    950: "#fef2f2",
  },

  info: {
    50: "#172554",
    100: "#1e3a8a",
    200: "#1e40af",
    300: "#1d4ed8",
    400: "#2563eb",
    500: "#3b82f6",
    600: "#60a5fa",
    700: "#93c5fd",
    800: "#bfdbfe",
    900: "#dbeafe",
    950: "#eff6ff",
  },

  // Surface colors
  background: "#0f172a",
  surface: "#1e293b",
  surfaceVariant: "#334155",

  // Text colors
  onBackground: "#f8fafc",
  onSurface: "#e2e8f0",
  onSurfaceVariant: "#cbd5e1",

  // Border colors
  border: "#475569",
  borderVariant: "#64748b",

  // Special colors
  overlay: "rgba(0, 0, 0, 0.7)",
  disabled: "#64748b",
  placeholder: "#64748b",
} as const;

// Light theme
const lightTheme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
  shadows,

  // Utility functions
  gap: (multiplier: number) => multiplier * spacing.md,
  radius: (size: keyof typeof borderRadius) => borderRadius[size],

  // Component-specific styles
  components: {
    button: {
      height: 48,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
    input: {
      height: 48,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
    },
    card: {
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      backgroundColor: lightColors.surface,
    },
  },
} as const;

// Dark theme
const darkTheme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
  shadows,

  // Utility functions
  gap: (multiplier: number) => multiplier * spacing.md,
  radius: (size: keyof typeof borderRadius) => borderRadius[size],

  // Component-specific styles
  components: {
    button: {
      height: 48,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
    input: {
      height: 48,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
    },
    card: {
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      backgroundColor: darkColors.surface,
    },
  },
} as const;

// App themes
export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

// Export theme types for reuse
export type Theme = typeof lightTheme;
export type Colors = typeof lightColors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;

// Breakpoints for responsive design
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

// Configure Unistyles
StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    // Enable adaptive themes based on system settings
    // This automatically handles light/dark mode based on device settings
    adaptiveThemes: true,
  },
});

// TypeScript declarations for better IntelliSense
type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
