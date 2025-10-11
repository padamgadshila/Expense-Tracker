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
      color: colors.grayText,
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
      // margin: 8,
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
      marginTop: 10,
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

    list: {
      marginTop: 10,
      backgroundColor: colors.input.background,
      borderRadius: 15,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
      paddingHorizontal: 10,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconCont: {
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    listIcon: {
      fontSize: 30,
    },
    listSplit: {
      width: "68%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
};
