import { useStyles } from "@/assets/styles/auth.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAction } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const login = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const loginUser = useAction(api.useAction.loginUserAction);
  const styles = useStyles();
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

      router.push("/(home)/(tabs)");
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
      colors={colors.gradient.background}
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
        placeholderTextColor={colors.input.placeHolder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.input.placeHolder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot Password ?</Text>
      </View>
      <TouchableOpacity style={{ width: "100%" }} onPress={handleLogin}>
        <LinearGradient colors={colors.button.background} style={styles.button}>
          {loading ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ActivityIndicator
                size="small"
                color={colors.button.buttonText}
                style={{ marginRight: 8, height: "auto" }}
              />
              <Text style={styles.buttonText}>Loggin in...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkGreyText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.linkText}>Register here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default login;
