import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import publicFormService, { PublicFormWithFields } from "@/services/public-form-service";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";

export default function PreviewFormScreen() {
  const { formId } = useLocalSearchParams();

  const [form, setForm] = useState<PublicFormWithFields | null>(null);

  useEffect(() => {
    if (typeof formId !== 'string') return;
    publicFormService.getFormWithFields(formId, { preview: true })
      .then((data) => {
        if (!data) return Alert.alert('Error', 'Form not found.');
        setForm(data);
      });
  }, [formId]);

  return (
    <ScreenContainer style={{ justifyContent: 'center' }}>
      <Title align="center">{form?.title}</Title>
      <Text style={{ textAlign: 'center'}}>{form?.description}</Text>
    </ScreenContainer>
  )
}
