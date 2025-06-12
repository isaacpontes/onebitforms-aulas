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
          <Stack.Screen name="forms/list" options={{ title: 'All Forms' }} />
          <Stack.Screen name="forms/show/[formId]" options={{ title: 'Form Details' }} />
          <Stack.Screen name="forms/edit/[formId]" options={{ title: 'Edit Form' }} />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
