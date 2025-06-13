import { FieldKind } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Picker } from "@react-native-picker/picker";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  value: FieldKind;
  onChange: (value: FieldKind) => void;
}

export const FieldKindPicker: FC<Props> = ({ value, onChange }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Field Kind</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onChange}
        >
          <Picker.Item label="Short Text" value="short_text" />
          <Picker.Item label="Long Text" value="long_text" />
          <Picker.Item label="Single Option" value="single_option" />
          <Picker.Item label="Multiple Option" value="multiple_option" />
        </Picker>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.sm,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
  picker: {
    backgroundColor: theme.colors.background,
    color: theme.colors.text
  }
});