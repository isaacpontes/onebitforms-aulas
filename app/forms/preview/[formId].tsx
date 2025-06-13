import FormField from "@/components/response/FormField";
import { ShowFormStart } from "@/components/response/ShowFormStart";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import publicFormService, { PublicFormWithFields } from "@/services/public-form-service";
import { useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

export default function PreviewFormScreen() {
  const { formId } = useLocalSearchParams();
  const { theme } = useTheme();
  const router = useRouter();

  const [form, setForm] = useState<PublicFormWithFields | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof formId !== 'string') return;
    publicFormService.getFormWithFields(formId, { preview: true })
      .then((data) => {
        if (!data) return Alert.alert('Error', 'Form not found.');
        setForm(data);
        setLoading(false);
      });
  }, [formId]);

  if (loading) {
    return (
      <ScreenContainer style={{ justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.text} size={"large"} />
      </ScreenContainer>
    );
  }

  if (!form) {
    return (
      <ScreenContainer style={{ justifyContent: 'center' }}>
        <Title align="center">Form not found.</Title>
      </ScreenContainer>
    );
  }

  if (currentStep === -1) {
    return (
      <ShowFormStart
        title={form.title}
        description={form.description ?? ''}
        onStart={() => setCurrentStep(0)}
      />
    );
  }

  const field = form.fields[currentStep];

  const handleNext = () => {
    if (currentStep < 0 || currentStep >= form.fields.length) return;
    setCurrentStep(current => current + 1);
  }

  const handleSubmit = () => {
    Alert.alert('Success', 'Your form was submitted successfuly.');
    router.back();
  };

  const handleBack = () => {
    if (currentStep < 0 || currentStep >= form.fields.length) return;
    setCurrentStep(current => current - 1);
  }

  return (
    <FormField.Wrapper
      field={field}
      isFirst={currentStep === 0}
      isLast={currentStep === form.fields.length - 1}
      onSubmit={handleSubmit}
      onNext={handleNext}
      onBack={handleBack}
    >
      <Input />
    </FormField.Wrapper>
  )
}
