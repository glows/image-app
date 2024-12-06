import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { DatabaseProvider } from "@/components/DatabaseProvider";
import { ThemeProvider as ThemeProviderSC } from "styled-components/native";
import { theme } from "@/scripts/theme";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <ThemeProviderSC theme={theme}>
        <DatabaseProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="article" options={{ headerShown: false }} />
            <Stack.Screen name="Story" options={{ headerShown: false }} />

            <Stack.Screen name="+not-found" />
          </Stack>
        </DatabaseProvider>
      </ThemeProviderSC>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
