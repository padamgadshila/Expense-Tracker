import { styles } from "@/assets/styles/auth.style";
import { purpleTheme } from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const login = () => {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        onChangeText={setemail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={{ width: "100%" }}>
        <LinearGradient
          colors={purpleTheme.gradient.button}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
