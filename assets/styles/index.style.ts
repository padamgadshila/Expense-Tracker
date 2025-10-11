import { useTheme } from "@/hooks/themeContext";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    namecontainer: {
      // backgroundColor: colors,
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    nameText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 25,
    },

    logoutIcon: {
      color: colors.primary,
      fontSize: 40,
    },
    balanceContainer: {
      marginTop: 20,
      // backgroundColor: purpleTheme.background,
      padding: 20,
      borderRadius: 10,
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
    },
    incomeText: {
      color: colors.feedback.success,
      fontSize: 23,
      fontWeight: 500,
    },
    expenseText: {
      color: colors.feedback.error,
      fontSize: 23,
      fontWeight: 500,
    },
  });
};
