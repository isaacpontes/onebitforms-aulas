import { useSession } from "@/providers/SessionContext";
import formsService from "@/services/forms-service";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "../ui/Button";

export const QuickLinks = () => {
  const { theme, switchTheme } = useTheme();
  const { signOut, user } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreateForm = async () => {
    setLoading(true);
    if (!user) {
      router.replace('/');
      return;
    }
    const form = await formsService.createEmptyForm(user.id);
    if (!form) {
      Alert.alert('Error', 'Could not retrieve the form data.');
      return;
    }
    router.navigate({
      pathname: '/forms/edit/[formId]',
      params: { formId: form.id }
    });
    setLoading(false);
  };

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Button
        title="Create new form"
        disabled={loading}
        loading={loading}
        onPress={() => handleCreateForm()}
      />
      <Button title="All forms" variant="outline" onPress={() => router.navigate('/forms/list')} />
      <Button title="View profile" variant="outline" onPress={() => { }} />
      <Button title="Switch theme" variant="outline" onPress={() => switchTheme()} />
      <Button title="Sign out" variant="danger" onPress={() => signOut()} />
    </View>
  );
}