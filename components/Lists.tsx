import { useStyles } from "@/assets/styles/index.style";
import { category } from "@/data/category";
import { useTheme } from "@/hooks/themeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Transaction {
  _id: string;
  amount: number;
  desc: string;
  type: string;
  category: string;
  date: string;
}
interface ListsProps {
  data: Transaction;
  onDelete: (id: string) => void;
}

const Lists = ({ data, onDelete }: ListsProps) => {
  const { colors } = useTheme();
  const styles = useStyles();
  const categoryItem = category.find((item) => item.name === data.category);
  return (
    <View style={styles.list}>
      <View style={styles.iconCont}>
        <FontAwesome6
          name={categoryItem?.iconName || ""}
          color={
            data.type === "Income" ? colors.success.text : colors.error.text
          }
          style={styles.listIcon}
        />
      </View>

      <View style={styles.listSplit}>
        <View style={{ alignItems: "flex-start" }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.grayText }}
          >
            {data.desc}
          </Text>
          <Text style={{ color: colors.grayText }}>{data.type}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color:
                data.type === "Income"
                  ? colors.success.text
                  : colors.error.text,
            }}
          >
            {data.type === "Income" ? `+ ₹${data.amount}` : `- ₹${data.amount}`}
          </Text>

          <Text style={{ color: colors.grayText }}>{data.date}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.iconCont}
        onPress={() => onDelete(data._id)}
      >
        <FontAwesome6
          name="trash-alt"
          color={colors.error.text}
          style={styles.listIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Lists;
