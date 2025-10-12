import { useStyles } from "@/assets/styles/transaction.style";
import CategoryOption from "@/components/options";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const add = () => {
  const { colors } = useTheme();
  const styles = useStyles();
  const addtransaction = useMutation(api.transaction.addTransaction);

  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [selected, setIsSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [tname, setTname] = useState("");
  const category = [
    { id: 1, name: "Food & Drinks", iconName: "utensils" },
    { id: 2, name: "Shopping", iconName: "cart-shopping" },
    { id: 3, name: "Transportation", iconName: "car" },
    { id: 4, name: "Bills", iconName: "file-invoice-dollar" },
    { id: 5, name: "Entertainment", iconName: "film" },
    { id: 6, name: "Income", iconName: "arrow-trend-up" },
    { id: 7, name: "Others", iconName: "ellipsis" },
  ];

  const handleAmountChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (!numericText) {
      setAmount("");
      return;
    }
    const formatted = Number(numericText).toLocaleString("en-IN");
    setAmount(formatted);
  };

  const submit = async () => {
    try {
      setLoading(true);
      if (!type || !amount || !tname || !selected) {
        Alert.alert("Please fill all the values");
        return;
      }
      const userId = await AsyncStorage.getItem("userId");
      const numericAmount = Number(amount.replace(/,/g, ""));

      const res = await addtransaction({
        userId: userId || "",
        amount: numericAmount,
        desc: tname,
        type: type,
        category: selected,
      });

      Alert.alert("Transaction added successfully!");

      setType(null);
      setAmount("");
      setTname("");
      setIsSelected(null);
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Alert.alert((error as any).data);
      } else {
        Alert.alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={colors.gradient.background}
      style={styles.container}
    >
      <Text style={styles.heading}>New Transcation</Text>

      <View style={styles.card}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.button, type === "Income" && styles.incomeButton]}
            onPress={() => setType("Income")}
          >
            <FontAwesome
              style={[
                styles.buttonIcon,
                type === "Income" && styles.incomeText,
              ]}
              name="arrow-circle-up"
            />
            <Text
              style={[
                styles.buttonText,
                type === "Income" && styles.incomeText,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, type === "Expenses" && styles.expenseButton]}
            onPress={() => setType("Expenses")}
          >
            <FontAwesome
              style={[
                styles.buttonIcon,
                type === "Expenses" && styles.expenseText,
              ]}
              name="arrow-circle-down"
            />
            <Text
              style={[
                styles.buttonText,
                type === "Expenses" && styles.expenseText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        {/* input section */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor={colors.input.placeHolder}
            keyboardType="number-pad"
            value={amount}
            onChangeText={handleAmountChange}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Transaction name"
            placeholderTextColor={colors.input.placeHolder}
            value={tname}
            onChangeText={setTname}
          />
        </View>
        {/* category */}
        <Text style={styles.categoryText}>Select Category</Text>
        <View style={styles.categoryWrapper}>
          {category.map((item) => (
            <CategoryOption
              key={item.id}
              data={item}
              isSelected={selected === item.name}
              onSelect={() => setIsSelected(item.name)}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={submit}>
        <LinearGradient
          style={styles.saveButton}
          colors={colors.button.background}
        >
          {isLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ActivityIndicator
                size="small"
                color={colors.button.buttonText}
                style={{ marginRight: 8, height: "auto" }}
              />
              <Text style={styles.saveButtonText}>Saving...</Text>
            </View>
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default add;
