import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const HomeTabs = () => {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabs.activeTintColor,
        tabBarInactiveTintColor: colors.tabs.inactiveTintColor,
        tabBarStyle: {
          backgroundColor: colors.tabs.tabBarBackground,
          shadowColor: colors.shadowColor,
          borderTopWidth: 1,
          borderColor: "#ccc",
          paddingTop: 5,
          paddingHorizontal: 30,
          alignItems: "center",
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeTabs;
