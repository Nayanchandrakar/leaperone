import { Fragment } from "react"
import { SignupForm } from "@/features/auth/components/forms/sign-up"
import {
  AuthContent,
  AuthForm,
  AuthWrapper,
} from "@/features/auth/components/layout/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

export default function CreateAccountPage() {
  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <SignupForm />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
