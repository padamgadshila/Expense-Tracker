import { useStyles } from "@/assets/styles/index.style";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
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

  return (
    <LinearGradient
      colors={colors.gradient.background}
      style={{ flex: 1, padding: 15 }}
    >
      <View style={styles.namecontainer}>
        <Text style={styles.nameText}>Welcome, {name}</Text>
        <FontAwesome
          name="sign-out"
          onPress={logout}
          style={styles.logoutIcon}
        />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.greyText}>Total Balance</Text>
        <Text style={styles.balance} onPress={toggleTheme}>
          ₹500000
        </Text>
        <View style={styles.splitCont}>
          <View>
            <Text>Income</Text>
            <Text style={styles.incomeText}>₹500000</Text>
          </View>
          <View>
            <Text>Expenses</Text>
            <Text style={styles.expenseText}>₹500000</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Index;
