import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

// Define Transaction type
interface Transaction {
  _id: string;
  amount: number;
  desc: string;
  type: "Income" | "Expenses";
  category: string;
  date: string;
}

const COLORS = [
  "#6A0DAD", // purple
  "#FF6B6B", // red
  "#FFA500", // orange
  "#4CAF50", // green
  "#1E90FF", // blue
  "#FF69B4", // pink
  "#A9A9A9", // gray
  "#8B4513", // brown
  "#00CED1", // dark turquoise
  "#FFD700", // gold
  "#20B2AA", // light sea green
  "#FF4500", // orange red
  "#7B68EE", // medium slate blue
  "#2E8B57", // sea green
  "#FF1493", // deep pink
];

const Summary = () => {
  const { colors } = useTheme();
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) setUserId(id);
      } catch (error) {
        console.error("Error loading userId:", error);
      }
    };
    fetchUserId();
  }, []);

  // Fetch transactions using Convex
  const transactions = useQuery(
    api.transaction.getTransaction,
    userId ? { userId } : "skip"
  );

  // Loading state
  if (!userId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.grayText }}>
          Loading...
        </Text>
      </View>
    );
  }

  // Calculate totals and category totals
  const calculateSummary = (transactions: Transaction[]) => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((t) => {
      if (t.type === "Income") totalIncome += t.amount;
      else totalExpense += t.amount;

      if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
      categoryTotals[t.category] += t.type === "Income" ? t.amount : -t.amount;
    });

    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance, categoryTotals };
  };

  const { totalIncome, totalExpense, balance, categoryTotals } =
    transactions.length
      ? calculateSummary(transactions)
      : { totalIncome: 0, totalExpense: 0, balance: 0, categoryTotals: {} };

  // Prepare PieChart data
  const chartData = Object.entries(categoryTotals)
    .filter(([_, value]) => value !== 0)
    .map(([name, value], index) => ({
      name,
      amount: Math.abs(value),
      color: COLORS[index % COLORS.length],
      legendFontColor: colors.grayText,
      legendFontSize: 14,
    }));

  const screenWidth = Dimensions.get("window").width - 30; // padding

  return (
    <LinearGradient colors={colors.gradient.background} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 15 }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: colors.grayText,
            marginBottom: 15,
          }}
        >
          Summary
        </Text>

        {/* Balance Card */}
        <View
          style={{
            backgroundColor: colors.input.background,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: colors.grayText }}>Balance</Text>
          <Text
            style={{ fontSize: 28, fontWeight: "bold", color: colors.primary }}
          >
            ₹{balance}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center", width: "50%" }}>
              <Text style={{ color: colors.grayText }}>Income</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.success.text,
                }}
              >
                ₹{totalIncome}
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: colors.grayText,
                opacity: 0.3,
              }}
            />
            <View style={{ alignItems: "center", width: "50%" }}>
              <Text style={{ color: colors.grayText }}>Expenses</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.error.text,
                }}
              >
                ₹{totalExpense}
              </Text>
            </View>
          </View>
        </View>

        {/* Pie Chart */}
        {chartData.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.grayText,
                marginBottom: 10,
              }}
            >
              Category Breakdown
            </Text>
            <PieChart
              data={chartData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#6A0DAD",
                backgroundGradientTo: "#D8C6FF",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // color of slices / text
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        ) : (
          <Text
            style={{
              color: colors.grayText,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No transactions yet to show in chart.
          </Text>
        )}

        {/* Details by Category */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: colors.grayText,
            marginVertical: 15,
          }}
        >
          Details by Category
        </Text>
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <View
            key={cat}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: colors.grayText }}>{cat}</Text>
            <Text
              style={{
                color: amt >= 0 ? colors.success.text : colors.error.text,
              }}
            >
              ₹{amt}
            </Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Summary;
