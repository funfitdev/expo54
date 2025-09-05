import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="formsheet"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetAllowedDetents:
              Platform.OS === "ios" ? "fitToContents" : [0.4, 0.9],
            sheetCornerRadius: 20,
          }}
        />
        <Stack.Screen
          name="formsheet-scroll"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetAllowedDetents:
              Platform.OS === "ios" ? "fitToContents" : [0.4, 0.9],
            sheetCornerRadius: 20,
          }}
        />
        <Stack.Screen
          name="formsheet-flatlist"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetAllowedDetents:
              Platform.OS === "ios" ? "fitToContents" : [0.4, 0.9],
            sheetCornerRadius: 20,
          }}
        />
        <Stack.Screen
          name="formsheet-flatlist-keyboard"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetAllowedDetents:
              Platform.OS === "ios" ? "fitToContents" : [0.9],
            sheetCornerRadius: 20,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
