import { Fragment } from "react"
import { ForgotPasswordForm } from "@/features/auth/components/forms/forgot-password"
import { AuthContent, AuthForm, AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

export default function ForgotPasswordPage() {
  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <ForgotPasswordForm />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>forgot password page content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
