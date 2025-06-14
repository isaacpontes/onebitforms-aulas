import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MultipleOptionFieldProps {
  options: string[];
  value: string;
  onSelect: (selected: string) => void;
}

export const MultipleOptionField: FC<MultipleOptionFieldProps> = ({ options, value, onSelect }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  let selectedOptions: string[] = [];

  try {
    selectedOptions = JSON.parse(value);
    if (!Array.isArray(selectedOptions)) selectedOptions = [];
  } catch (error) {
    selectedOptions = []
  }

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      selectedOptions = selectedOptions.filter(o => o !== option);
    } else {
      selectedOptions.push(option);
    }

    onSelect(JSON.stringify(selectedOptions));
  }

  return (
    <View style={styles.optionsContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionBox,
            {
              borderColor: selectedOptions.includes(option) ? theme.colors.primary : theme.colors.border
            }
          ]}
          onPress={() => toggleOption(option)}
        >
          <View style={styles.iconLabel}>
            <View style={styles.iconWrapper}>
              {selectedOptions.includes(option) && (
                <Feather name="check" size={16} color={theme.colors.primary} />
              )}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MultipleOptionField;

const createStyles = (theme: Theme) => StyleSheet.create({
  optionsContainer: {
    gap: theme.spacing.md,
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
  },
  iconLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 20,
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
  },
});