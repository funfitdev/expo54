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

/*
sheetAllowedDetents
Due to technical issues in platform component integration with react-native, presentation: 'formSheet' has limited support for flex: 1.

On Android, using flex: 1 on a top-level content container passed to a formSheet with showAllowedDetents: 'fitToContents' causes the sheet to not display at all, leaving only the dimmed background visible. This is because it is the sheet, not the parent who is source of the size. Setting fixed values for sheetAllowedDetents, e.g. [0.4, 0.9], works correctly (content is aligned for the highest detent).

On iOS, flex: 1 with showAllowedDetents: 'fitToContents' works properly but setting a fixed value for showAllowedDetents causes the screen to not respect the flex: 1 style - the height of the container does not fill the formSheet fully, but rather inherits intrinsic size of its contents. This tradeoff is currently necessary to prevent "sheet flickering" problem on iOS.

If you don't use flex: 1 but the content's height is less than max screen height, the rest of the sheet might become translucent or use the default theme background color (you can see this happening on the screenshots in the descrption of this PR). To match the sheet to the background of your content, set backgroundColor in the contentStyle prop of the given screen.

On Android, there are also some problems with getting nested ScrollViews to work properly. The solution is to set nestedScrollEnabled on the ScrollView, but this does not work if the content's height is less than the ScrollView's height. Please see this PR for details and suggested workaround.
*/
