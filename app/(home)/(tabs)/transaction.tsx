import { useStyles } from "@/assets/styles/transaction.style";
import CategoryOption from "@/components/options";
import { api } from "@/convex/_generated/api";
import { category } from "@/data/category";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const add = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useStyles();
  const addtransaction = useMutation(api.transaction.addTransaction);

  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [selected, setIsSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [tname, setTname] = useState("");

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length > 2) return;
    if (!cleaned) {
      setAmount("");
      return;
    }

    const integerPart = parts[0]
      ? Number(parts[0]).toLocaleString("en-IN")
      : "";

    const formatted =
      parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
    setAmount(formatted);
  };

  const submit = async () => {
    try {
      setLoading(true);
      if (!type || !amount || !tname || !selected) {
        Toast.show({ type: "error", text1: "Please fill all the values" });
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

      Toast.show({ type: "success", text1: "Transaction added!" });
      router.push("/(home)/(tabs)");

      setType(null);
      setAmount("");
      setTname("");
      setIsSelected(null);
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        Toast.show({ type: "error", text1: (error as any).data });
      } else {
        Toast.show({ type: "error", text1: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={colors.gradient.background}
      style={styles.container} // just flex:1
    >
      {/* <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      > */}
      <View style={styles.wrapper}>
        <Text style={styles.heading}>New Transaction</Text>
        <TouchableOpacity onPress={submit}>
          <LinearGradient
            style={styles.saveButton}
            colors={colors.button.background}
          >
            {isLoading ? (
              <Text style={styles.saveButtonText}>Saving...</Text>
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
      </View>
      <Text style={styles.categoryText}>Select Category</Text>
      <FlatList
        data={category}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryOption
            data={item}
            isSelected={selected === item.name}
            onSelect={() => setIsSelected(item.name)}
          />
        )}
        showsVerticalScrollIndicator={true}
        numColumns={2}
        columnWrapperStyle={{ marginBottom: 10, gap: 10 }}
        style={{ padding: 10 }}
      />
      {/* </ScrollView> */}
    </LinearGradient>
  );
};

export default add;
