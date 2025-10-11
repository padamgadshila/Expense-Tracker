import { purpleTheme } from "@/constants/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  namecontainer: {
    backgroundColor: purpleTheme.background,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameText: {
    color: purpleTheme.text,
    fontWeight: "bold",
    fontSize: 25,
  },

  logoutIcon: {
    color: purpleTheme.primary,
    fontSize: 40,
  },
  balanceContainer: {
    marginTop: 20,
    backgroundColor: purpleTheme.background,
    padding: 20,
    borderRadius: 10,
  },
  greyText: {
    color: purpleTheme.secondary,
    fontSize: 18,
  },
  balance: {
    color: purpleTheme.primary,
    fontSize: 40,
    fontWeight: "bold",
  },
  splitCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  incomeText: {
    color: purpleTheme.success.text,
    fontSize: 23,
    fontWeight: 500,
  },
  expenseText: {
    color: purpleTheme.error.text,
    fontSize: 23,
    fontWeight: 500,
  },
});
