# Production-Grade Theme System

This project includes a comprehensive, production-ready theme system built with React Native Unistyles v3. The theme system provides:

## 🎨 Features

### Color System
- **Primary & Secondary Colors**: Full 50-950 color scales for brand colors
- **Semantic Colors**: Success, Warning, Error, and Info with complete scales
- **Neutral Grays**: Comprehensive grayscale palette
- **Surface Colors**: Background, surface, and surface variants
- **Text Colors**: Proper contrast ratios for text on different backgrounds
- **Utility Colors**: Border, overlay, disabled, and placeholder colors

### Typography System
- **Font Families**: System fonts with fallbacks
- **Font Sizes**: 12 different sizes from XS to 7XL
- **Line Heights**: Tight, base, relaxed, and loose options
- **Letter Spacing**: Fine-tuned spacing from tighter to widest

### Spacing System
- **Consistent Scale**: 8-point grid system (4, 8, 16, 24, 32, 48, 64px)
- **Semantic Names**: XS, SM, MD, LG, XL, XXL, XXXL

### Border Radius
- **Complete Scale**: From none to full (circular)
- **Consistent Values**: 0, 2, 4, 8, 12, 16, 24, 9999px

### Shadow System
- **Multiple Levels**: None, SM, MD, LG, XL
- **Platform Optimized**: iOS shadows and Android elevation
- **Proper Opacity**: Realistic shadow effects

### Component Presets
- **Button Styles**: Height, padding, and border radius presets
- **Input Styles**: Consistent form element styling
- **Card Styles**: Ready-to-use card component styling

## 📁 File Structure

```
src/
  unistyles.ts          # Main theme configuration
  components/
    theme-demo.tsx      # Interactive theme showcase
unistyles.config.ts     # Unistyles v3 configuration
types/
  unistyles.d.ts        # TypeScript declarations
```

## 🔧 Usage

### Basic Theme Usage

```tsx
import { appThemes } from '../unistyles';

const theme = appThemes.light; // or appThemes.dark

// Use colors
backgroundColor: theme.colors.primary[500]
color: theme.colors.onBackground

// Use spacing
padding: theme.spacing.md
marginBottom: theme.gap(2) // 2 * 16px = 32px

// Use typography
fontSize: theme.typography.fontSize.lg
lineHeight: theme.typography.lineHeight.base

// Use shadows
...theme.shadows.md

// Use component presets
...theme.components.button
```

### With Unistyles Hooks (Advanced)

```tsx
import { useUnistyles } from 'react-native-unistyles';

const MyComponent = () => {
  const { theme } = useUnistyles();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.onBackground }}>
        Hello World
      </Text>
    </View>
  );
};
```

### TypeScript Support

The theme system includes full TypeScript support with:
- Autocomplete for all theme properties
- Type safety for color scales (50-950)
- IntelliSense for spacing, typography, and component values

### Dark Mode Support

The system includes both light and dark themes:

```tsx
// Light theme
const lightTheme = appThemes.light;

// Dark theme  
const darkTheme = appThemes.dark;
```

Dark theme features:
- Inverted color scales for better dark mode contrast
- Proper text contrast ratios
- Dark-optimized shadow system
- Consistent spacing and typography

## 🎯 Best Practices

### Color Usage
- Use semantic colors (success, warning, error) for status indicators
- Use primary[500] as the main brand color
- Use neutral colors for text and borders
- Always consider contrast ratios for accessibility

### Spacing
- Use the gap() function for consistent spacing multipliers
- Stick to the predefined spacing scale
- Use the same spacing values for margin and padding

### Typography
- Use heading styles for titles and section headers
- Use body styles for content text
- Use caption for supporting text
- Maintain consistent line heights

### Components
- Leverage component presets for consistent UI elements
- Extend base component styles rather than creating from scratch
- Use the shadow system for depth and elevation

## 🌙 Theme Switching

To implement theme switching in your app:

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

// Switch to dark theme
UnistylesRuntime.setTheme('dark');

// Switch to light theme
UnistylesRuntime.setTheme('light');

// Get current theme
const currentTheme = UnistylesRuntime.themeName;
```

## 🔍 Demo Component

Run the ThemeDemo component to see all theme features in action:

```tsx
import ThemeDemo from '../components/theme-demo';

// Shows color palette, typography, components, spacing, and shadows
<ThemeDemo />
```

## 📱 Platform Considerations

The theme system is optimized for both iOS and Android:
- Uses platform-appropriate shadow/elevation
- Handles system font differences
- Supports platform-specific styling when needed

## 🚀 Production Ready

This theme system is production-ready and includes:
- ✅ Comprehensive color system with accessibility considerations
- ✅ Scalable typography with proper line heights
- ✅ Consistent spacing based on 8-point grid
- ✅ Full TypeScript support with IntelliSense
- ✅ Light and dark mode support
- ✅ Platform-optimized styling
- ✅ Component presets for rapid development
- ✅ Easy theme switching capabilities
- ✅ Maintainable and extensible architecture

## 🔧 Customization

To customize the theme:

1. **Colors**: Modify color scales in `lightColors` and `darkColors`
2. **Typography**: Adjust font sizes, families, and spacing in the `typography` object
3. **Spacing**: Update the spacing scale in the `spacing` object
4. **Components**: Add or modify component presets in the `components` object
5. **Shadows**: Customize shadow styles in the `shadows` object

The modular structure makes it easy to extend and customize for your specific design requirements.
