import { FormsOverviewCard } from "@/components/home/FormsOverviewCard";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";
import { useSession } from "@/providers/SessionContext";
import formsService from "@/services/forms-service";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { user, session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const [totalForms, setTotalForms] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [latestForm, setLatestForm] = useState<{ title: string, responses: number } | null>(null);

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  useEffect(() => {
    if (user) {
      formsService.getHomeStats(user.id).then(data => {
        setTotalForms(data.totalForms);
        setTotalResponses(data.totalResponses);
        setLatestForm(data.latestForm);
      })
    }
  }, []);

  return (
    <ScreenContainer>
      <View style={{ marginBottom: theme.spacing.md }}>
        <Text style={{ color: theme.colors.secondary, fontSize: theme.fontSizes.md }}>Welcome back,</Text>
        <Title>{user?.user_metadata.name}</Title>
      </View>

      <FormsOverviewCard
        totalForms={totalForms}
        totalResponses={totalResponses}
        latestForm={latestForm}
      />

      <View style={{ marginTop: theme.spacing.xl }}>
        <QuickLinks />
      </View>
    </ScreenContainer>
  )
}