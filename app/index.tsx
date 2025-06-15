import { SignInForm } from "@/components/auth/SignInForm";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import { useSession } from "@/providers/SessionContext";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/home');
    }
  }, [session, router]);

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <Image
          source={require('@/assets/images/onebitforms-logo.png')}
          style={styles.logo}
        />

        <Title align="center">Sign in with your email</Title>
        <SignInForm />

        {user && <Text>You're already logged in as {user.user_metadata.name}</Text>}

        <Text style={styles.footerText}>
          Don't have an account?
          {' '}
          <Link href={'/signup'} style={styles.linkText}>Sign Up</Link>
        </Text>
      </View>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 200,
    marginHorizontal: 'auto'
  },
  footerText: {
    marginTop: theme.spacing.lg,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});