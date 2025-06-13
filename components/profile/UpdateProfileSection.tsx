import { useSession } from "@/providers/SessionContext";
import profileService from "@/services/profile-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Title } from "../ui/Title";

export const UpdateProfileSection = () => {
  const { user } = useSession();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [name, setName] = useState(user?.user_metadata.name ?? '');
  const [phone, setPhone] = useState(user?.user_metadata.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await profileService.updateProfile({ name, email, phone });
    Alert.alert('Profile updated', 'Your profile was uptaded successfuly!');
    setLoading(false);
  }

  return (
    <View style={styles.section}>
      <Title>Personal Information</Title>

      <View style={styles.formGroup}>
        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>

      <Button title="Save profile" onPress={handleSave} disabled={loading} loading={loading} />
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
