import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export type Form = {
  id: string;
  userId: string;
  title: string;
  description: string;
  isPublished: boolean;
}

const formsService = {
  createEmptyForm: async (userId: string) => {
    const { data, error } = await supabase
      .from('forms')
      .insert({
        user_id: userId,
        title: 'New blank form',
        description: 'This is an empty form. Edit it\'s description.',
        is_published: false
      })
      .select(`
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published
      `)
      .single<Form>();

    if (error) {
      console.log(error);
      Alert.alert('Error', 'Couldn\'t create a new empty form.');
    }

    return data;
  }
};

export default formsService;