import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
}

const profileService = {
  updateProfile: async (updates: Partial<UserProfile>) => {
    const payload: {
      email?: string,
      data: Record<string, string>
    } = { data: {} }

    if (updates.email) payload.email = updates.email;
    if (updates.name) payload.data.name = updates.name;
    if (updates.phone) payload.data.phone = updates.phone;

    const { data, error } = await supabase.auth.updateUser(payload);

    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error while updating the user profile.');
      return;
    }
    return data.user;
  },

  updatePassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error while updating the user password.');
      return;
    }
  }
};

export default profileService;