import { FieldCard } from "@/components/forms/FieldCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Switch } from "@/components/ui/Switch";
import { Title } from "@/components/ui/Title";
import formsService, { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import confirm from "@/utils/confirm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function EditFormScreen() {
  const { formId } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (typeof formId !== 'string') {
      Alert.alert('Error', 'Invalid form id.');
      return;
    }
    formsService.getFormById(formId).then((data) => {
      if (!data) return;
      setTitle(data.form.title);
      setDescription(data.form.description ?? '');
      setIsPublished(data.form.isPublished);
      setFields(data.fields ?? []);
    });
  }, []);

  const saveForm = async () => {
    if (typeof formId !== 'string') return;
    await formsService.updateForm(formId, { title, description, isPublished });
    Alert.alert('Success', 'Form saved successfuly!');
  }

  const deleteForm = async () => {
    if (typeof formId !== 'string') return;
    confirm(
      'Delete form',
      'Are you sure you want to delete this form? This action is permanent.',
      async () => {
        await formsService.deleteForm(formId);
        router.replace('/forms/list');
      }
    )
  }


  const addField = async () => {
    if (typeof formId !== 'string') return;
    const field = await formsService.addField(formId, fields.length);
    if (!field) return;
    setFields(current => [...current, field]);
    Alert.alert('Success', 'New field added to the form.');
  }

  const saveField = async (fieldId: string, field: Field) => {
    await formsService.updateField(fieldId, field);
    Alert.alert('Success', 'Field saved.');
  }

  const moveUp = async (fieldId: string) => {
    let updatedFields = [...fields];
    const fieldIndex = updatedFields.findIndex(f => f.id === fieldId);
    if (fieldIndex < 1) return updatedFields;
    const targetIndex = fieldIndex - 1;

    const aux = updatedFields[targetIndex];
    updatedFields[targetIndex] = updatedFields[fieldIndex];
    updatedFields[fieldIndex] = aux;

    updatedFields = updatedFields.map((field, index) => ({ ...field, fieldOrder: index }));
    await formsService.updateField(updatedFields[targetIndex].id, updatedFields[targetIndex]);
    await formsService.updateField(updatedFields[fieldIndex].id, updatedFields[fieldIndex]);

    setFields(updatedFields);
  }

  const moveDown = async (fieldId: string) => {
    let updatedFields = [...fields];
    const fieldIndex = updatedFields.findIndex(f => f.id === fieldId);
    if (fieldIndex >= fields.length - 1) return updatedFields;
    const targetIndex = fieldIndex + 1;

    const aux = updatedFields[targetIndex];
    updatedFields[targetIndex] = updatedFields[fieldIndex];
    updatedFields[fieldIndex] = aux;

    updatedFields = updatedFields.map((field, index) => ({ ...field, fieldOrder: index }));
    await formsService.updateField(updatedFields[targetIndex].id, updatedFields[targetIndex]);
    await formsService.updateField(updatedFields[fieldIndex].id, updatedFields[fieldIndex]);

    setFields(updatedFields);
  }

  const updateFieldsState = (fieldId: string, changes: Partial<Field>) => {
    setFields(current => {
      const updatedFields = [...current];
      const fieldIndex = updatedFields.findIndex(f => f.id === fieldId);
      Object.assign(updatedFields[fieldIndex], changes);
      return updatedFields;
    })
  }

  const removeField = async (fieldId: string) => {
    setFields(current => {
      const updatedFields = current.filter(f => f.id !== fieldId)
      return updatedFields.map((field, index) => ({ ...field, fieldOrder: index }));
    });
    await formsService.removeField(fieldId);
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>

        <Title>Editing form</Title>
        <Text>{formId}</Text>

        <Input placeholder="Title" value={title} onChangeText={setTitle} />
        <Input placeholder="Description" value={description} onChangeText={setDescription} />

        <View style={styles.switchRow}>
          <Switch label="Published?" value={isPublished} onValueChange={setIsPublished} />
        </View>

        <Button title="Save form" onPress={() => saveForm()} />

        <View style={styles.buttonsRow}>
          <Button title="Preview form" style={{ flex: 1 }} variant="outline" onPress={() => { }} />
          <Button title="Delete form" style={{ flex: 1 }} variant="danger" onPress={deleteForm} />
        </View>

        <View style={styles.fieldHeader}>
          <Title>Fields</Title>
          <Button title="Add field" variant="outline" onPress={() => addField()} />
        </View>

        {fields.map(field => (
          <FieldCard
            key={field.id}
            field={field}
            onSaveField={saveField}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onRemove={removeField}
            onStateChange={updateFieldsState}
            isFirst={field.fieldOrder === 0}
            isLast={field.fieldOrder === (fields.length - 1)}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  content: {
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  switchRow: {
    marginTop: theme.spacing.md,
    alignItems: 'flex-start',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: theme.spacing.lg,
  },
});