import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Input } from "../ui/Input";

interface LongTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const LongTextField: FC<LongTextFieldProps> = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Input
      placeholder="Start typing..."
      value={value}
      onChangeText={onChangeText}
      multiline
      numberOfLines={24}
      style={styles.textarea}
      textAlignVertical="top"
    />
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  textarea: {
    minHeight: 120,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
});