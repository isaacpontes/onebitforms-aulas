import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export type Form = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublished: boolean;
  createdAt: string;
}

export type Field = {
  id: string;
  kind: 'short_text' | 'long_text' | 'single_option' | 'multiple_option'
  label: string;
  options?: string[];
  isRequired: boolean;
  fieldOrder: number;
  formId: string;
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
  },

  // Obter os formulários de um usuário
  getUserForms: async (userId: string) => {
    const { data, error } = await supabase
      .from('forms')
      .select(`
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error loading forms.');
      return [];
    }

    return data as Form[];
  },

  // Obter os dados detalhados de um formulário
  getFormById: async (formId: string) => {
    const { data: form, error: formError } = await supabase
      .from('forms')
      .select(`
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `)
      .eq('id', formId)
      .single<Form>();

    if (formError) {
      console.log(formError);
      Alert.alert('Error', 'Error loading the form data');
      return;
    }

    const { data: fields, error: fieldsError } = await supabase
      .from('form_fields')
      .select(`
        id,
        kind,
        label,
        options,
        isRequired: is_required,
        fieldOrder: field_order,
        formId: form_id
      `)
      .eq('form_id', form.id)
      .order('field_order', { ascending: true });

    if (fieldsError) {
      console.log(fieldsError);
      Alert.alert('Error', 'Error loading the form fields data');
      return { form };
    }

    const { count: responseCount } = await supabase
      .from('form_responses')
      .select('id', { count: 'exact', head: true })
      .eq('form_id', form.id);

    return {
      form,
      fields: fields || [] as Field[],
      responseCount
    }
  },

  // Obter as respostas de um formulário
  getFormResponses: async (formId: string) => {
    const { data, error } = await supabase
      .from('form_responses')
      .select('id, formId: form_id, submittedAt: submitted_at, answers, metadata')
      .eq('form_id', formId)
      .order('')

    if (error || !data) {
      console.log(error);
      Alert.alert('Error', 'Error fetching the form responses.');
      return [];
    }

    return data;
  },

  // Atualizar e excluir um formulário
  updateForm: async (formId: string, updates: Partial<Form>) => {
    const payload = {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.isPublished !== undefined && { is_published: updates.isPublished }),
    };

    const { error } = await supabase
      .from('forms')
      .update(payload)
      .eq('id', formId);

    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error updating the form.');
    }
  },

  deleteForm: async (formId: string) => {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', formId);
    if (error) {
      console.log(error);
      Alert.alert('Error', 'Error deleting the form.');
    }
  }
};

export default formsService;