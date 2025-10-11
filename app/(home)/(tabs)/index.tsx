import { useStyles } from "@/assets/styles/index.style";
import Lists from "@/components/Lists";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
const Index = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { colors, toggleTheme } = useTheme();
  const styles = useStyles();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fname = await AsyncStorage.getItem("fname");
        const email = await AsyncStorage.getItem("email");

        console.log("Loaded user:", fname, email);

        if (fname) setName(fname);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text>Loading...</Text>
      </>
    );
  }

  const logout = async () => {
    await AsyncStorage.multiRemove(["email", "userId", "fname"]);
    router.replace("/(auth)/login");
  };
  const transactions = [
    {
      id: "1",
      title: "Salary",
      type: "Income",
      amount: 300,
      date: "Aug 15 2025",
    },
    {
      id: "2",
      title: "Groceries",
      type: "Expense",
      amount: 50,
      date: "Aug 16 2025",
    },
    {
      id: "3",
      title: "Freelance",
      type: "Income",
      amount: 150,
      date: "Aug 17 2025",
    },
    {
      id: "4",
      title: "Rent",
      type: "Expense",
      amount: 200,
      date: "Aug 18 2025",
    },
    {
      id: "5",
      title: "Restaurant",
      type: "Expense",
      amount: 75,
      date: "Aug 19 2025",
    },
    {
      id: "6",
      title: "Electricity Bill",
      type: "Expense",
      amount: 120,
      date: "Aug 20 2025",
    },
    {
      id: "7",
      title: "Stocks Profit",
      type: "Income",
      amount: 90,
      date: "Aug 21 2025",
    },
    {
      id: "8",
      title: "Internet Bill",
      type: "Expense",
      amount: 60,
      date: "Aug 22 2025",
    },
    {
      id: "9",
      title: "Gift from Friend",
      type: "Income",
      amount: 100,
      date: "Aug 23 2025",
    },
    {
      id: "10",
      title: "Transport",
      type: "Expense",
      amount: 40,
      date: "Aug 24 2025",
    },
    {
      id: "11",
      title: "Bonus",
      type: "Income",
      amount: 250,
      date: "Aug 25 2025",
    },
    {
      id: "12",
      title: "Movie Night",
      type: "Expense",
      amount: 30,
      date: "Aug 26 2025",
    },
    {
      id: "13",
      title: "Dividends",
      type: "Income",
      amount: 80,
      date: "Aug 27 2025",
    },
    {
      id: "14",
      title: "Coffee",
      type: "Expense",
      amount: 20,
      date: "Aug 28 2025",
    },
    {
      id: "15",
      title: "Selling Old Items",
      type: "Income",
      amount: 110,
      date: "Aug 29 2025",
    },
  ];

  return (
    <LinearGradient
      colors={colors.gradient.background}
      style={{ flex: 1, paddingHorizontal: 15 }}
    >
      <View style={styles.namecontainer}>
        <Text style={styles.nameText}>Hello, {name} 👋</Text>
        <FontAwesome
          name="sign-out"
          onPress={logout}
          style={styles.logoutIcon}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.greyText}>Balance</Text>
        <Text style={styles.balance} onPress={toggleTheme}>
          ₹500000
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
            <Text style={styles.incomeText}>₹500000</Text>
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
            <Text style={styles.expenseText}>₹500000</Text>
          </View>
        </View>
      </View>

      {/* list */}

      <Text
        style={{ fontSize: 24, fontWeight: "bold", color: colors.grayText }}
      >
        Recent Transactions
      </Text>

      <FlatList
        style={{ paddingHorizontal: 3 }}
        data={transactions}
        renderItem={({ item }) => <Lists data={item} />}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
};

export default Index;
