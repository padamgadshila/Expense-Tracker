import { useStyles } from "@/assets/styles/index.style";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const Lists = ({ data }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.list}>
      <View style={styles.iconCont}>
        {data.type === "Income" ? (
          <FontAwesome
            name="money"
            color={colors.success.text}
            style={styles.listIcon}
          />
        ) : (
          <FontAwesome
            name="money"
            color={colors.error.text}
            style={styles.listIcon}
          />
        )}
      </View>
      <View style={styles.listSplit}>
        <View style={{ alignItems: "flex-start" }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.grayText }}
          >
            {data.title}
          </Text>
          <Text style={{ color: colors.grayText }}>{data.type}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {data.type === "Income" ? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.success.text,
              }}
            >
              + ₹{data.amount}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.error.text,
              }}
            >
              - ₹{data.amount}
            </Text>
          )}

          <Text style={{ color: colors.grayText }}>{data.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconCont}>
        <FontAwesome
          name="trash"
          color={colors.error.text}
          style={styles.listIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Lists;
