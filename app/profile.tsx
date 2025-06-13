import { UpdatePasswordSection } from "@/components/profile/UpdatePasswordSection";
import { UpdateProfileSection } from "@/components/profile/UpdateProfileSection";
import { ScreenContainer } from "@/components/ui/ScreenContainer";

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <UpdateProfileSection />
      <UpdatePasswordSection />
    </ScreenContainer>
  )
}