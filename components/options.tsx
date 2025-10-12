import { useStyles } from "@/assets/styles/transaction.style";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type CategoryOptionProps = {
  data: {
    id: number;
    name: string;
    iconName: string;
  };
  isSelected: boolean;
  onSelect: () => void;
};

const CategoryOption: React.FC<CategoryOptionProps> = ({
  data,
  isSelected,
  onSelect,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.options, isSelected && styles.optionActive]}
      onPress={onSelect}
    >
      <FontAwesome6
        style={[styles.optionColor, isSelected && styles.optionActiveText]}
        name={data.iconName}
        size={22}
      />
      <Text style={[styles.optionColor, isSelected && styles.optionActiveText]}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryOption;
