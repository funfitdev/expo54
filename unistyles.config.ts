import { appThemes } from "./src/unistyles";

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

export default {
  breakpoints,
  themes: appThemes,
  settings: {
    // Enable adaptive themes based on system settings
    // This automatically handles light/dark mode based on device settings
    adaptiveThemes: true,
  },
};
