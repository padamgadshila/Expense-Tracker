import { useTheme } from "@/hooks/themeContext";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      borderBottomColor: colors.grayText,
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      borderBottomWidth: 1,
    },
    headerTitle: {
      color: colors.grayText,
      fontSize: 20,
      fontWeight: "bold",
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
    forgotPassword: {
      width: "100%",
    },
    linkText: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 19,
    },
  });
};
