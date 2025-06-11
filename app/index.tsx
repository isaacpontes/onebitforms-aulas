import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Switch } from "@/components/ui/Switch";
import { Title } from "@/components/ui/Title";
import { useTheme } from "@/themes/ThemeContext";

export default function Index() {
  const { switchTheme } = useTheme();

  return (
    <ScreenContainer>
      <Title>
        Boas Vindas
      </Title>
      <Input placeholder="Escreva aqui..." />
      <Switch label="Teste" value={false} onValueChange={() => { }} />
      <Button
        title="Switch theme"
        onPress={() => switchTheme()}
      />
    </ScreenContainer>
  );
}
