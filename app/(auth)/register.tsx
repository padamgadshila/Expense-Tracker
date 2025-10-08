import { styles } from "@/assets/styles/auth.style";
import { purpleTheme } from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const register = () => {
  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
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
      setError("");
    } catch (error) {
      setError("Something went wrong");
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
        colors={purpleTheme.gradient.background}
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
            value={fname}
            onChangeText={setFname}
          />
          <TextInput
            style={styles.inputFlex}
            placeholder="Last name"
            value={lname}
            onChangeText={setLname}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={Cpassword}
          onChangeText={setCPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={{ width: "100%" }} onPress={handleRegister}>
          <LinearGradient
            colors={purpleTheme.gradient.button}
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
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.linkText}>Login here</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};
export default register;
