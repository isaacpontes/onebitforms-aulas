import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/themes/ThemeContext";
import { useState } from "react";
import { View } from "react-native";

export const SignInForm = () => {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {

  }

  return (
    <>
      <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Sign In" onPress={handleSignIn} />
    </>
  )
}