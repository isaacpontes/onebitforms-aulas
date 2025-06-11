import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const SignUpForm = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!')
      return;
    }

    router.push('/confirm-email');
  }

  return (
    <>
      <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
        <Input
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Your phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Input
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Input
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button title="Sign Up" onPress={handleSignUp} />
    </>
  )
}