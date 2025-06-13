import { Alert } from "react-native";

export default function confirm(
  title: string,
  message: string,
  onConfirm?: () => void,
  onCancel?: () => void
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Confirm",
        onPress: onConfirm,
        isPreferred: false
      },
      {
        text: "Cancel",
        onPress: onCancel,
        isPreferred: true
      },
    ]
  );
}