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
    publicFormService.getFormWithFields(formId, { preview: false })
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
    if (field.isRequired && !answers[field.id]) {
      Alert.alert('Error', 'This field is required.');
      return;
    }
    setCurrentStep(current => current + 1);
  }

  const handleSubmit = async () => {
    if (field.isRequired && !answers[field.id]) {
      Alert.alert('Error', 'This field is required.');
      return;
    }
    await publicFormService.submitAnswers(form.id, answers);
    router.navigate('/forms/thankyou');
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
      {field.kind === 'short_text' && (
        <Input
          placeholder="Start typing..."
          value={answers[field.id]}
          onChangeText={(text) => setAnswers(current => ({ ...current, [field.id]: text }))}
        />
      )}

      {field.kind === 'long_text' && (
        <FormField.LongText
          value={answers[field.id]}
          onChangeText={(text) => setAnswers(current => ({ ...current, [field.id]: text }))}
        />
      )}

      {field.kind === 'single_option' && (
        <FormField.SingleOption
          value={answers[field.id]}
          onSelect={(option) => setAnswers(current => ({ ...current, [field.id]: option }))}
          options={field.options ?? []}
        />
      )}

      {field.kind === 'multiple_option' && (
        <FormField.MultipleOption
          value={answers[field.id]}
          onSelect={(option) => setAnswers(current => ({ ...current, [field.id]: option }))}
          options={field.options ?? []}
        />
      )}
    </FormField.Wrapper>
  )
}
