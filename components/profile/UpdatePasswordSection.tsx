import { useSession } from "@/providers/SessionContext";
import profileService from "@/services/profile-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Title } from "../ui/Title";

export const UpdatePasswordSection = () => {
  const { signOut } = useSession();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setLoading(true);

    await profileService.updatePassword(password);
    Alert.alert('Success', 'Password updated successfuly. Please sign in again.');
    await signOut();
    router.dismissAll();
    router.replace('/');
  };

  return (
    <View style={styles.section}>
      <Title>Update Password</Title>

      <View style={styles.formGroup}>
        <Input
          placeholder="New password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input
          placeholder="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        <Button title="Update password" onPress={handleUpdate} />
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  section: {
    marginBottom: theme.spacing.xl,
  },
  formGroup: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});