import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

// Move styles inside component to ensure theme is loaded
const createStyles = () =>
  StyleSheet.create((theme, rt) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize["5xl"],
      fontWeight: "bold",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.onSurfaceVariant,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize.lg,
      marginBottom: theme.spacing.md,
    },

    // Theme Toggle
    themeToggle: {
      backgroundColor: theme.colors.primary[500],
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    themeToggleText: {
      color: "white",
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      marginBottom: theme.spacing.xs,
    },
    themeToggleSubtext: {
      color: "white",
      fontSize: theme.typography.fontSize.sm,
      opacity: 0.8,
    },

    sectionTitle: {
      fontSize: theme.typography.fontSize["2xl"],
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.md,
    },

    // Color Grid
    colorGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    primaryColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    secondaryColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.secondary[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    successColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.success[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    warningColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.warning[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    errorColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.error[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    infoColorCard: {
      width: 100,
      height: 80,
      backgroundColor: theme.colors.info[500],
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    colorLabel: {
      color: "white",
      fontSize: theme.typography.fontSize.sm,
      fontWeight: "600",
    },

    // Typography
    heading1: {
      fontSize: theme.typography.fontSize["4xl"],
      fontWeight: "bold",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.tight * theme.typography.fontSize["4xl"],
    },
    heading2: {
      fontSize: theme.typography.fontSize["3xl"],
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.tight * theme.typography.fontSize["3xl"],
    },
    heading3: {
      fontSize: theme.typography.fontSize["2xl"],
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize["2xl"],
    },
    bodyLarge: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize.lg,
    },
    bodyRegular: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize.md,
    },
    bodySmall: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize.sm,
    },
    caption: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.lg,
      lineHeight:
        theme.typography.lineHeight.base * theme.typography.fontSize.xs,
    },

    // Components
    componentGroup: {
      marginBottom: theme.spacing.xl,
    },
    componentLabel: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.sm,
    },

    // Buttons
    buttonRow: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary[500],
      ...theme.components.button,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.sm,
    },
    primaryButtonText: {
      color: "white",
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary[500],
      ...theme.components.button,
      justifyContent: "center",
      alignItems: "center",
    },
    secondaryButtonText: {
      color: theme.colors.primary[500],
      fontSize: theme.typography.fontSize.md,
      fontWeight: "600",
    },

    // Input
    input: {
      ...theme.components.input,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      color: theme.colors.onSurface,
      fontSize: theme.typography.fontSize.md,
    },

    // Card
    card: {
      ...theme.components.card,
      ...theme.shadows.md,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: theme.spacing.sm,
    },
    cardBody: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.onSurface,
      lineHeight:
        theme.typography.lineHeight.relaxed * theme.typography.fontSize.md,
    },

    // Spacing Demo
    spacingDemo: {
      gap: theme.spacing.md,
    },
    xsSpacingBox: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
    smSpacingBox: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.sm,
    },
    mdSpacingBox: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    lgSpacingBox: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.lg,
    },
    spacingLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary[700],
      fontWeight: "500",
    },

    // Shadow Demo
    shadowDemo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    smallShadowCard: {
      width: 80,
      height: 80,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.sm,
    },
    mediumShadowCard: {
      width: 80,
      height: 80,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.md,
    },
    largeShadowCard: {
      width: 80,
      height: 80,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.lg,
    },
    xlShadowCard: {
      width: 80,
      height: 80,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadows.xl,
    },
    shadowLabel: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.onSurface,
      fontWeight: "500",
      textAlign: "center",
    },
  }));

const ThemeDemo = () => {
  const styles = createStyles();

  const toggleTheme = () => {
    // Toggle between adaptive themes and manual theme selection
    if (UnistylesRuntime.hasAdaptiveThemes) {
      // Disable adaptive themes and set to light
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme("light");
    } else {
      // Check current theme and toggle
      const currentTheme = UnistylesRuntime.themeName;
      if (currentTheme === "light") {
        UnistylesRuntime.setTheme("dark");
      } else if (currentTheme === "dark") {
        UnistylesRuntime.setTheme("light");
      } else {
        // Re-enable adaptive themes
        UnistylesRuntime.setAdaptiveThemes(true);
      }
    }
  };

  const getThemeButtonText = () => {
    if (UnistylesRuntime.hasAdaptiveThemes) {
      return `System (${UnistylesRuntime.colorScheme})`;
    }
    return UnistylesRuntime.themeName === "light" ? "Light" : "Dark";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Design System Demo</Text>
        <Text style={styles.subtitle}>
          Production-grade theme with Unistyles
        </Text>

        {/* Theme Toggle Button */}
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Text style={styles.themeToggleText}>
            Theme: {getThemeButtonText()}
          </Text>
          <Text style={styles.themeToggleSubtext}>
            Tap to cycle: System → Light → Dark → System
          </Text>
        </TouchableOpacity>
      </View>

      {/* Color Palette Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Palette</Text>
        <View style={styles.colorGrid}>
          <View style={styles.primaryColorCard}>
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={styles.secondaryColorCard}>
            <Text style={styles.colorLabel}>Secondary</Text>
          </View>
          <View style={styles.successColorCard}>
            <Text style={styles.colorLabel}>Success</Text>
          </View>
          <View style={styles.warningColorCard}>
            <Text style={styles.colorLabel}>Warning</Text>
          </View>
          <View style={styles.errorColorCard}>
            <Text style={styles.colorLabel}>Error</Text>
          </View>
          <View style={styles.infoColorCard}>
            <Text style={styles.colorLabel}>Info</Text>
          </View>
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <Text style={styles.heading1}>Heading 1</Text>
        <Text style={styles.heading2}>Heading 2</Text>
        <Text style={styles.heading3}>Heading 3</Text>
        <Text style={styles.bodyLarge}>
          Body Large - Lorem ipsum dolor sit amet
        </Text>
        <Text style={styles.bodyRegular}>
          Body Regular - Lorem ipsum dolor sit amet consectetur
        </Text>
        <Text style={styles.bodySmall}>
          Body Small - Lorem ipsum dolor sit amet consectetur adipiscing
        </Text>
        <Text style={styles.caption}>
          Caption - Supporting text for components
        </Text>
      </View>

      {/* Components Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Components</Text>

        {/* Buttons */}
        <View style={styles.componentGroup}>
          <Text style={styles.componentLabel}>Buttons</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Secondary</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inputs */}
        <View style={styles.componentGroup}>
          <Text style={styles.componentLabel}>Inputs</Text>
          <TextInput style={styles.input} placeholder="Enter text here..." />
        </View>

        {/* Cards */}
        <View style={styles.componentGroup}>
          <Text style={styles.componentLabel}>Cards</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Card Title</Text>
            <Text style={styles.cardBody}>
              This is a card component showcasing the theme system. It uses
              predefined spacing, colors, and typography.
            </Text>
          </View>
        </View>
      </View>

      {/* Spacing System */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spacing System</Text>
        <View style={styles.spacingDemo}>
          <View style={styles.xsSpacingBox}>
            <Text style={styles.spacingLabel}>XS (4px)</Text>
          </View>
          <View style={styles.smSpacingBox}>
            <Text style={styles.spacingLabel}>SM (8px)</Text>
          </View>
          <View style={styles.mdSpacingBox}>
            <Text style={styles.spacingLabel}>MD (16px)</Text>
          </View>
          <View style={styles.lgSpacingBox}>
            <Text style={styles.spacingLabel}>LG (24px)</Text>
          </View>
        </View>
      </View>

      {/* Shadow System */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shadow System</Text>
        <View style={styles.shadowDemo}>
          <View style={styles.smallShadowCard}>
            <Text style={styles.shadowLabel}>Small</Text>
          </View>
          <View style={styles.mediumShadowCard}>
            <Text style={styles.shadowLabel}>Medium</Text>
          </View>
          <View style={styles.largeShadowCard}>
            <Text style={styles.shadowLabel}>Large</Text>
          </View>
          <View style={styles.xlShadowCard}>
            <Text style={styles.shadowLabel}>Extra Large</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ThemeDemo;
