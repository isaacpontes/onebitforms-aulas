import formsService, { Field, Form, Response } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FC, useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ViewResponsesModalProps {
  form: Form
  fields: Field[];
  visible: boolean;
  onClose: () => void;
}

export const ViewResponsesModal: FC<ViewResponsesModalProps> = ({ form, fields, visible, onClose }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [responses, setResponses] = useState<Response[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    formsService.getFormResponses(form.id).then((data) => {
      setResponses(data);
      setLoading(false);
    })
  }, [form.id])

  const fieldLabels = fields.reduce((obj, field) => {
    obj[field.id] = field.label;
    return obj;
  }, {} as Record<string, string>);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Submitted Responses</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {responses.length === 0 ? (
          <Text style={styles.empty}>No responses yet.</Text>
        ) : (
          <FlatList
            data={responses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.answerCard}>
                <Text style={styles.answerDate}>
                  Submitted at: {new Date(item.submittedAt).toLocaleDateString()}
                </Text>

                {Object.entries(item.answers).map(([fieldId, answer]) => (
                  <View key={fieldId} style={styles.answerItem}>
                    <Text style={styles.answerKey}>{fieldLabels[fieldId]}</Text>
                    <Text style={styles.answerValue}>{answer}</Text>
                  </View>
                ))}
              </View>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: theme.spacing.xl,
  },
  answerCard: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  answerDate: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.xs,
    marginBottom: theme.spacing.sm,
  },
  answerItem: {
    marginBottom: theme.spacing.xs,
  },
  answerKey: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
  },
  answerValue: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.sm,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.secondary,
  },
});