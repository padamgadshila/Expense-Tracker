import { useTheme } from "@/hooks/themeContext";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    heading: {
      color: colors.primary,
      fontSize: 35,
      fontWeight: "bold",
      marginBottom: 20,
    },

    inputFlexWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 5,
      width: "100%",
      marginBottom: 15,
    },
    inputFlex: {
      flex: 1,
      color: colors.input.text,
      padding: 12,
      borderColor: colors.input.border,
      borderWidth: 1,
      borderRadius: 15,
      width: "100%",
      height: 60,
      fontSize: 20,
      backgroundColor: colors.input.background,
    },
    input: {
      color: colors.input.text,
      padding: 12,
      borderColor: colors.input.border,
      borderWidth: 1,
      borderRadius: 15,
      width: "100%",
      height: 60,
      fontSize: 20,
      backgroundColor: colors.input.background,
      marginBottom: 15,
    },
    button: {
      padding: 15,
      borderRadius: 15,
      width: "100%",
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: colors.button.buttonText,
      fontSize: 20,
      fontWeight: "bold",
    },
    linkContainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    linkGreyText: {
      color: colors.grayText,
      fontSize: 19,
      fontWeight: "semibold",
    },
    forgotPassword: {
      width: "100%",
    },
    linkText: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 19,
    },
    errorContainer: {
      marginBottom: 15,
      width: "100%",
      backgroundColor: colors.error.background,
      padding: 10,
      borderRadius: 5,
    },
    errorText: {
      color: colors.error.text,
      fontWeight: "bold",
      fontSize: 19,
      textAlign: "center",
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
      gap: 10,
    },
    otpInput: {
      borderWidth: 1,
      borderRadius: 8,
      width: 45,
      height: 55,
      fontSize: 20,
    },
    passwordInput: {
      borderWidth: 1,
      borderRadius: 8,
      height: 50,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
  });
};
