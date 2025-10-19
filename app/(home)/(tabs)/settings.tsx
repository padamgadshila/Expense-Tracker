import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Settings = () => {
  const { colors, toggleTheme, theme } = useTheme();
  const router = useRouter();

  // Preferences states
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailySummaryEnabled, setDailySummaryEnabled] = useState(true);
  const deleteAccount = useMutation(api.users.deleteAll);
  // Handlers
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["email", "userId", "fname"]);
    router.replace("/(auth)/login");
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const email = await AsyncStorage.getItem("email");
              if (!email) {
                console.log("No email found");
                return;
              }

              await deleteAccount({ email });

              await AsyncStorage.multiRemove(["email", "userId", "fname"]);
              router.replace("/(auth)/login");
            } catch (error: any) {
              console.log("Error deleting account:", error.message || error);
            }
          },
        },
      ]
    );
  };

  const handleChangePassword = () => {
    router.push("/(home)/(settings)/change-password");
  };

  const handleRateApp = () => {
    console.log("Open rating link");
  };

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.input.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Account Section */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.grayText,
          marginBottom: 10,
        }}
      >
        Account
      </Text>
      <TouchableOpacity
        onPress={handleChangePassword}
        style={{ paddingVertical: 15 }}
      >
        <Text style={{ color: colors.primary }}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={{ paddingVertical: 15 }}
      >
        <Text style={{ color: colors.error.text }}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 15 }}>
        <Text style={{ color: colors.grayText }}>Logout</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: colors.grayText,
          opacity: 0.2,
          marginVertical: 20,
        }}
      />

      {/* Preferences Section */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.grayText,
          marginBottom: 10,
        }}
      >
        Preferences
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors.grayText }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleThemeToggle} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors.grayText }}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors.grayText }}>Daily Summary</Text>
        <Switch
          value={dailySummaryEnabled}
          onValueChange={setDailySummaryEnabled}
        />
      </View>
    </ScrollView>
  );
};

export default Settings;
