import { useStyles } from "@/assets/styles/settings.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
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
import Toast from "react-native-toast-message";

const ChangePassword = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useStyles();

  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  const ChangePassword = useAction(api.useAction.chnagePasswordAction);

  const handlePasswordChange = async () => {
    if (!oldPassword || !password || !Cpassword) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
      return;
    }

    if (password !== Cpassword) {
      Toast.show({ type: "error", text1: "New passwords do not match" });
      return;
    }

    const email = await AsyncStorage.getItem("email");

    try {
      setLoading(true);

      await ChangePassword({
        email: email!,
        oldPassword,
        newPassword: password,
      });
      Toast.show({ type: "success", text1: "Password changed successfully" });
      router.replace("/(home)/(tabs)");
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
    <LinearGradient
      colors={colors.gradient.background}
      style={styles.container}
    >
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color={colors.grayText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.grayText }]}>
            Change Password
          </Text>
          <View style={{ width: 10 }} />
        </View>

        <View style={{ padding: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor={colors.input.placeHolder}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={true}
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

          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={handlePasswordChange}
          >
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
                  <Text style={styles.buttonText}>Changing...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.forgotPassword}>
            <Text style={styles.linkText}>Forgot Password ?</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChangePassword;
