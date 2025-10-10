import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

const Index = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1️⃣ Get data from AsyncStorage
        const fname = await AsyncStorage.getItem("fname");
        const email = await AsyncStorage.getItem("email");

        console.log("Loaded user:", fname, email);

        if (fname) setName(fname);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text>Loading...</Text>
      </>
    );
  }

  const logout = async () => {
    await AsyncStorage.multiRemove(["email", "userId", "fname"]);
    router.replace("/(auth)/login");
  };

  return (
    <>
      {name ? (
        <Text style={{ fontSize: 20, fontWeight: "bold" }} onPress={logout}>
          Welcome, {name} 👋
        </Text>
      ) : (
        <Text style={{ fontSize: 18 }}>Welcome back, user!</Text>
      )}
    </>
  );
};

export default Index;
