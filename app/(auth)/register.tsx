import { useStyles } from "@/assets/styles/auth.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAction } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const register = () => {
  const router = useRouter();
  const registerUser = useAction(api.useAction.registerUserAction);
  const styles = useStyles();
  const { colors } = useTheme();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!fname || !lname || !email || !password || !Cpassword) {
        setError("All fields are required");
        return;
      }
      setError("");

      if (password !== Cpassword) {
        setError("Passwords do not match");
        return;
      }
      const user = await registerUser({
        fname,
        lname,
        email,
        password,
      });

      await AsyncStorage.multiSet([
        ["email", user.email],
        ["userId", user._id],
        ["fname", user.fname],
      ]);

      router.push("/(home)");
      setError("");
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
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={colors.gradient.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.heading}>Create Account</Text>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.inputFlexWrapper}>
          <TextInput
            style={styles.inputFlex}
            placeholder="First name"
            placeholderTextColor={colors.input.placeHolder}
            value={fname}
            onChangeText={setFname}
          />
          <TextInput
            style={styles.inputFlex}
            placeholder="Last name"
            placeholderTextColor={colors.input.placeHolder}
            value={lname}
            onChangeText={setLname}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.input.placeHolder}
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          placeholderTextColor={colors.input.placeHolder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.input.placeHolder}
          value={Cpassword}
          onChangeText={setCPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={{ width: "100%" }} onPress={handleRegister}>
          <LinearGradient
            colors={colors.button.background}
            style={styles.button}
          >
            {loading ? (
              <Text style={styles.buttonText}>Registering...</Text>
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkGreyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.linkText}>Login here</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};
export default register;
