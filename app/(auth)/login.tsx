import { styles } from "@/assets/styles/auth.style";
import { purpleTheme } from "@/constants/color";
import { api } from "@/convex/_generated/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAction } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
const login = () => {
  const router = useRouter();
  const loginUser = useAction(api.useAction.loginUserAction);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      setError("");

      const user = await loginUser({ email, password });
      await AsyncStorage.multiSet([
        ["email", user.email],
        ["userId", user._id],
        ["fname", user.fname],
      ]);

      router.push("/(home)");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        setError((error as any).data);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={purpleTheme.gradient.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>Welcome Back</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={{ width: "100%" }} onPress={handleLogin}>
        <LinearGradient
          colors={purpleTheme.gradient.button}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Continue"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.linkText}>Register here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default login;
