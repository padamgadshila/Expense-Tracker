import { useTheme } from "@/hooks/themeContext";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    heading: {
      textAlign: "center",
      fontSize: 20,
      color: colors.grayText,
      fontWeight: "bold",
      paddingLeft: 20,
    },
    wrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 0,
    },
    card: {
      marginTop: 20,
      alignItems: "center",
      backgroundColor: colors.input.background,
      padding: 20,
      borderRadius: 10,
    },
    buttonWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      width: "45%",
      height: 60,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: "#808080",
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 15,
    },
    incomeButton: {
      backgroundColor: colors.success.background,
      borderColor: colors.success.text,
    },
    expenseButton: {
      backgroundColor: colors.error.background,
      borderColor: colors.error.text,
    },
    buttonIcon: {
      fontSize: 30,
      color: colors.grayText,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.grayText,
    },
    incomeText: {
      color: colors.success.text,
    },
    expenseText: {
      color: colors.error.text,
    },
    inputWrapper: {
      width: "100%",
      marginTop: 20,
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
      backgroundColor: colors.input.transcation,
    },
    categoryText: {
      marginVertical: 10,
      marginLeft: 20,
      width: "100%",
      // textAlign: "left",
      fontSize: 20,
      color: colors.grayText,
      fontWeight: "bold",
    },
    categoryWrapper: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    options: {
      padding: 8,
      borderRadius: 30,
      borderColor: colors.grayText,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    optionColor: {
      color: colors.grayText,
      fontSize: 18,
      marginHorizontal: 5,
    },
    optionActive: {
      backgroundColor: colors.input.transcation,
      borderColor: colors.input.border,
    },
    optionActiveText: {
      color: colors.grayText,
    },
    saveButton: {
      paddingVertical: 5,
      width: 130,
      borderRadius: 15,
      height: 40,
    },
    saveButtonText: {
      textAlign: "center",
      color: colors.button.buttonText,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
