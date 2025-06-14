import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { Field } from "./forms-service";

export type PublicFormWithFields = {
  id: string;
  title: string;
  description?: string;
  fields: Field[]
}

const publicFormService = {
  getFormWithFields: async (formId: string, { preview = false }: { preview: boolean }) => {
    if (preview) {
      const { data, error } = await supabase
        .from('forms')
        .select(`
          id,
          title,
          description,
          fields: form_fields (
            id,
            label,
            kind,
            options,
            isRequired: is_required,
            fieldOrder: field_order
          )
        `)
        .eq('id', formId)
        .order('field_order', { referencedTable: 'form_fields', ascending: true })
        .single<PublicFormWithFields>();
      if (error) {
        console.log(error);
        Alert.alert('Error', 'Error fetching the form.');
        return;
      }
      return data;
    }

    const { data, error } = await supabase
      .from('forms')
      .select(`
        id,
        title,
        description,
        fields: form_fields (
          id,
          label,
          kind,
          options,
          isRequired: is_required,
          fieldOrder: field_order
        )
      `)
      .eq('id', formId)
      .eq('is_published', true)
      .order('field_order', { referencedTable: 'form_fields', ascending: true })
      .single<PublicFormWithFields>();
    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error fetching the form.');
      return;
    }
    return data;
  },

  submitAnswers: async (formId: string, answers: Record<string, string>) => {
    const { error } = await supabase.from('form_responses').insert({
      form_id: formId,
      answers: answers
    });
    if (error) {
      Alert.alert('Error', 'Error submitting the responses.');
    }
  }
};

export default publicFormService;