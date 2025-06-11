import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

interface SignInAttributes {
  email: string;
  password: string;
}

interface SignUpAttributes {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const authService = {
  signIn: async (input: SignInAttributes) => {
    const { data, error } = await supabase.auth.signInWithPassword(input);
    if (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong.');
    }
    return data;
  },

  signUp: async (input: SignUpAttributes) => {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          name: input.name,
          phone: input.phone
        }
      }
    });

    if (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong.');
    }

    return data;
  }
}

export default authService;