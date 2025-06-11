import { SignUpForm } from "@/components/auth/SignUpForm";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Title } from "@/components/ui/Title";

export default function SignUpScreen() {
  return (
    <ScreenContainer>
      <Title align="center">Create your account</Title>
      <SignUpForm />
    </ScreenContainer>
  )
}