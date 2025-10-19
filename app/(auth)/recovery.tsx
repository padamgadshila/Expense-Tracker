import { useStyles } from "@/assets/styles/auth.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import { useAction, useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

const Recovery = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [testOtp, setTestOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtpAction = useMutation(api.users.sendRecoveryOtp);
  const verifyOtpAction = useMutation(api.users.verifyOtp);
  const passwordResetAction = useAction(api.useAction.resetPasswordAction);

  // --- OTP input handling ---
  const handleChangeOtp = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtpArr = [...otp];
    newOtpArr[index] = text;
    setOtp(newOtpArr);

    // Move to next input safely
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input safely
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // --- Step 1: Send OTP ---
  const handleSendOtp = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Enter your email" });
      return;
    }
    try {
      setLoading(true);
      const res = await sendOtpAction({ email });
      const otp = res.message.toString();
      setTestOtp(otp);
      Toast.show({ type: "success", text1: "Otp sent successfully" });
      setStep("otp");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to send OTP",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    try {
      const res = await sendOtpAction({ email });
      const otp = res.message.toString();
      setTestOtp(otp);
      Toast.show({ type: "success", text1: "Otp sent successfully" });
      setStep("otp");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to send OTP",
        });
      }
    }
  };
  // --- Step 2: Verify OTP and move to password ---
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const otpStr = otp.join("").trim();
      if (otpStr.length < 6) {
        Toast.show({ type: "error", text1: "Enter complete OTP" });
        return;
      }
      const res = await verifyOtpAction({ email, otp: parseInt(otpStr) });
      setStep("password");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({
          type: "error",
          text1: "Soemthing went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Reset password ---
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({ type: "error", text1: "All fields are required" });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      return;
    }
    try {
      setLoading(true);
      await passwordResetAction({ email, password: newPassword });
      Toast.show({ type: "success", text1: "Password reset successfully" });
      router.replace("/(auth)/login");
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
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
        style={styles.container}
      >
        {step === "email" && (
          <>
            <Text style={[styles.title, { color: colors.grayText }]}>
              Enter your recovery email
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: colors.grayText },
              ]}
              placeholder="Email"
              placeholderTextColor={colors.input.placeHolder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={{ width: "100%" }} onPress={handleSendOtp}>
              <LinearGradient
                style={styles.button}
                colors={colors.button.background}
              >
                {loading ? (
                  <Text style={styles.buttonText}>
                    <ActivityIndicator
                      color={colors.button.buttonText}
                      size={"large"}
                    ></ActivityIndicator>
                  </Text>
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {step === "otp" && (
          <>
            <Text style={[styles.title, { color: colors.grayText }]}>
              Enter OTP - {testOtp}
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChangeOtp(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoFocus={index === 0}
                  style={[
                    styles.otpInput,
                    { borderColor: colors.primary, color: colors.grayText },
                  ]}
                  textAlign="center"
                />
              ))}
            </View>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.linkText}>Resend OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={handleVerifyOtp}
            >
              <LinearGradient
                style={styles.button}
                colors={colors.button.background}
              >
                {loading ? (
                  <Text style={styles.buttonText}>
                    <ActivityIndicator
                      color={colors.button.buttonText}
                      size={"large"}
                    ></ActivityIndicator>
                  </Text>
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {step === "password" && (
          <>
            <Text style={[styles.title, { color: colors.grayText }]}>
              Create a new password
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: colors.grayText },
              ]}
              placeholder="New Password"
              placeholderTextColor={colors.input.placeHolder}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: colors.grayText },
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={colors.input.placeHolder}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={handleResetPassword}
            >
              <LinearGradient
                style={styles.button}
                colors={colors.button.background}
              >
                {loading ? (
                  <Text style={styles.buttonText}>
                    <ActivityIndicator
                      color={colors.button.buttonText}
                      size={"large"}
                    ></ActivityIndicator>
                  </Text>
                ) : (
                  <Text style={styles.buttonText}>Reset Password</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Recovery;
