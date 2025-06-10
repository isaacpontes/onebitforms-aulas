import { useTheme } from "@/themes/ThemeContext";
import { Stack } from "expo-router";
import { Button, StatusBar, Text, View } from "react-native";

export default function Index() {
  const { currentTheme, theme, switchTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background
      }}
    >
      <StatusBar barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text
        }}
      />
      <Text style={{ color: theme.colors.text, fontSize: theme.fontSizes.lg }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Button
        title="Switch theme"
        color={theme.colors.primary}
        onPress={() => switchTheme()}
      />
    </View>
  );
}
