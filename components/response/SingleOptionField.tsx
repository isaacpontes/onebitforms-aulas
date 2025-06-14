import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SingleOptionFieldProps {
  value: string;
  onSelect: (option: string) => void;
  options: string[]
}

export const SingleOptionField: FC<SingleOptionFieldProps> = ({ value, options, onSelect }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.optionsContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionBox,
            {
              borderColor: option === value ? theme.colors.primary : theme.colors.border,
            }
          ]}
          onPress={() => onSelect(option)}
        >
          <View style={styles.iconLabel}>
            <View style={styles.iconWrapper}>
              {option === value && (
                <Feather name="check" size={16} color={theme.colors.primary} />
              )}
            </View>

            <Text style={styles.optionText}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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