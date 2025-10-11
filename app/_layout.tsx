import { ThemeProvider, useTheme } from "@/hooks/themeContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const { theme } = useTheme();
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style={theme === "light" ? "dark" : "light"} />
          <Slot />
        </SafeAreaView>
      </ThemeProvider>
    </ConvexProvider>
  );
}
