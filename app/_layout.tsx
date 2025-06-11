import { SessionProvider } from "@/providers/SessionContext";
import { ThemeProvider } from "@/themes/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="confirm-email" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ title: 'Home' }} />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
