import { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { ScreenContainer } from "../ui/ScreenContainer";
import { Title } from "../ui/Title";
import { LongTextField } from "./LongTextField";
import MultipleOptionField from "./MultipleOptionField";
import { SingleOptionField } from "./SingleOptionField";

interface WrapperProps {
  field: Field;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ field, isFirst, isLast, onBack, onNext, onSubmit, children }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScreenContainer>
      <Title>{field.label}</Title>

      {children}

      <View style={styles.buttonsContainer}>
        <Button
          title="Back"
          onPress={onBack}
          style={styles.button}
          variant="outline"
        />
        <Button
          title={isLast ? 'Submit' : 'Next'}
          onPress={() => isLast ? onSubmit() : onNext()}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  )
};

export default {
  Wrapper,
  LongText: LongTextField,
  SingleOption: SingleOptionField,
  MultipleOption: MultipleOptionField
}

const createStyles = (theme: Theme) => StyleSheet.create({
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.sm,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    flexGrow: 1
  }
});