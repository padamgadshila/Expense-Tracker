import { useStyles } from "@/assets/styles/index.style";
import Lists from "@/components/Lists";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import Toast from "react-native-toast-message";

interface Transaction {
  _id: string;
  amount: number;
  desc: string;
  type: "Income" | "Expenses";
  category: string;
  date: string;
}

const Index = () => {
  const [name, setName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { colors, toggleTheme } = useTheme();
  const styles = useStyles();

  // Fetch user data once on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fname = await AsyncStorage.getItem("fname");
        const id = await AsyncStorage.getItem("userId");
        if (fname) setName(fname);
        if (id) setUserId(id);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    fetchUserData();
  }, []);
  // fetch transactions
  const transactions = useQuery(
    api.transaction.getTransaction,
    userId ? { userId: userId as Id<"users"> } : "skip"
  );

  // Delete mutation
  const deleteTransaction = useMutation(api.transaction.deleteTransaction);

  // Loading state while fetching userId or transactions
  if (!userId || transactions === undefined) {
    return (
      <LinearGradient
        colors={colors.gradient.background}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text style={{ color: colors.grayText, marginTop: 10 }}>
          Loading...
        </Text>
      </LinearGradient>
    );
  }

  const safeTransactions: Transaction[] = transactions.map((t) => ({
    ...t,
    type: t.type === "Income" ? "Income" : "Expenses",
  }));

  const formattedDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format transactions for display (runs on every render, but fine for small lists)
  const formattedTransactions = (transactions || []).map((item) => ({
    ...item,
    date: formattedDate(item.date),
  }));

  // // Delete handler
  const handleDelete = async (tid: string) => {
    try {
      if (!userId) return;
      Alert.alert(
        "Warning",
        "Are you sure you want to delete this transaction?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              await deleteTransaction({
                userId,
                tid: tid as Id<"transactions">,
              });
              Toast.show({
                type: "success",
                text1: "Transaction deleted",
              });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to delete transaction" });
    }
  };

  if (transactions === null) {
    return (
      <LinearGradient
        colors={colors.gradient.background}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: colors.grayText }}>
          Error loading transactions. Please try again.
        </Text>
      </LinearGradient>
    );
  }

  const calculateSummary = (transactions: Transaction[]) => {
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "Expenses")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  };

  const { totalIncome, totalExpense, balance } = safeTransactions.length
    ? calculateSummary(safeTransactions)
    : { totalIncome: 0, totalExpense: 0, balance: 0 };

  return (
    <LinearGradient
      colors={colors.gradient.background}
      style={{ flex: 1, paddingHorizontal: 15 }}
    >
      <View style={styles.namecontainer}>
        <Text style={styles.nameText}>Hello, {name || "User"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.greyText}>Total Balance</Text>
        <Text style={styles.balance} onPress={toggleTheme}>
          ₹{balance.toFixed(2)}
        </Text>
        <View style={styles.splitCont}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                color: colors.grayText,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Income
            </Text>
            <Text style={styles.incomeText}>₹{totalIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.line} />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                color: colors.grayText,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Expenses
            </Text>
            <Text style={styles.expenseText}>₹{totalExpense.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.grayText,
          marginVertical: 10,
        }}
      >
        Recent Transactions
      </Text>

      <FlatList
        style={{ paddingHorizontal: 3 }}
        data={formattedTransactions}
        renderItem={({ item }) => (
          <Lists data={item} onDelete={() => handleDelete(item._id)} />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text
            style={{ color: colors.grayText, textAlign: "center", padding: 20 }}
          >
            No transactions yet.
          </Text>
        }
      />
    </LinearGradient>
  );
};

export default Index;
