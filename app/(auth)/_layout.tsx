import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
