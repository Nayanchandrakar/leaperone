import { Fragment } from "react"
import { handleAuth } from "@/actions/utils"
import { ForgotPasswordForm } from "@/features/auth/components/forms/forgot-password"
import { AuthContent, AuthForm, AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

export default async function ForgotPasswordPage() {
  await handleAuth({ mode: "block" })

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
