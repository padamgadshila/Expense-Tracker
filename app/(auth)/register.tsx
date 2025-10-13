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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

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

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!fname || !lname || !email || !password || !Cpassword) {
        Toast.show({ type: "error", text1: "All fields are required" });
        return;
      }

      if (password !== Cpassword) {
        Toast.show({ type: "error", text1: "Passwords do not match" });
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
      Toast.show({ type: "success", text1: "Registered successfully" });
      router.push("/(home)/(tabs)");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({ type: "error", text1: "An unexpected error occurred" });
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ActivityIndicator
                  size="small"
                  color={colors.button.buttonText}
                  style={{ marginRight: 8, height: "auto" }}
                />
                <Text style={styles.buttonText}>Creating account...</Text>
              </View>
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
