import { useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { Text } from "react-native";
import { Button } from "../ui/Button";
import { ScreenContainer } from "../ui/ScreenContainer";
import { Title } from "../ui/Title";

interface Props {
  title: string;
  description: string;
  onStart: () => void;
}

export const ShowFormStart: FC<Props> = ({ title, description, onStart }) => {
  const { theme } = useTheme();
  return (
    <ScreenContainer style={{ justifyContent: 'center' }}>
      <Title align="center">{title}</Title>
      <Text style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>{description}</Text>
      <Button title="Start" onPress={onStart} />
    </ScreenContainer>
  )
}