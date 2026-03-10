import { Fragment } from "react"
import { AuthContent, AuthForm, AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { ValidateResetToken } from "@/features/auth/components/pages/reset-password/validate-reset-token"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ResetPassswordPageProps {
  params: Promise<{ token: string }>
}

export default function ResetPassswordPage({ params }: ResetPassswordPageProps) {
  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <ValidateResetToken params={params} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>Reset form content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
