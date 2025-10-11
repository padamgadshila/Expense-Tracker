import { useTheme } from "@/hooks/themeContext";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    namecontainer: {
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    nameText: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 30,
    },

    logoutIcon: {
      color: colors.primary,
      fontSize: 30,
    },

    card: {
      backgroundColor: colors.input.background,
      borderRadius: 12,
      padding: 16,
      margin: 8,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    greyText: {
      color: colors.grayText,
      fontSize: 18,
    },
    balance: {
      color: colors.primary,
      fontSize: 40,
      fontWeight: "bold",
    },
    splitCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    line: {
      backgroundColor: colors.grayText,
      height: 40,
      width: 1,
    },
    incomeText: {
      color: colors.success.text,
      fontSize: 23,
      fontWeight: "bold",
    },
    expenseText: {
      color: colors.error.text,
      fontSize: 23,
      fontWeight: "bold",
    },
  });
};
