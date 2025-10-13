import { ThemeProvider, useTheme } from "@/hooks/themeContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
export default function RootLayout() {
  const { theme, colors } = useTheme();
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.success.text,
          backgroundColor: colors.success.background,
        }}
        text1Style={{
          color: colors.success.text,
          fontWeight: "bold",
          fontSize: 20,
        }}
        text2Style={{ color: colors.success.text }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: colors.error.text,
          backgroundColor: colors.error.background,
        }}
        text1Style={{
          color: colors.error.text,
          fontWeight: "bold",
          fontSize: 20,
        }}
        text2Style={{ color: colors.error.text }}
      />
    ),
  };
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style={theme === "light" ? "dark" : "light"} />
          <Slot />
          <Toast config={toastConfig} />
        </SafeAreaView>
      </ThemeProvider>
    </ConvexProvider>
  );
}
