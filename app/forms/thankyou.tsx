import { Button } from "@/components/ui/Button";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ThankYouScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <ScreenContainer style={{ justifyContent: 'center' }}>
      <View style={styles.iconWrapper}>
        <Feather name="check-circle" size={72} color={theme.colors.primary} />
      </View>

      <Title align="center">All done!</Title>
      <Text style={styles.subtitle}>
        Your response has been submitted successfully.
      </Text>

      <Button
        title="Back to Home"
        onPress={() => router.navigate('/')}
        style={styles.button}
      />
    </ScreenContainer>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  iconWrapper: {
    marginBottom: theme.spacing.lg,
    marginHorizontal: 'auto'
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.secondary,
    textAlign: "center",
    maxWidth: 300,
    marginHorizontal: 'auto'
  },
  button: {
    marginTop: theme.spacing.lg
  }
});