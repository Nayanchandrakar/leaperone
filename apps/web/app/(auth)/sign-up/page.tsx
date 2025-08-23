import { Fragment } from "react"
import { SignupForm } from "@/features/auth/components/forms/sign-up"
import {
  AuthContent,
  AuthForm,
  AuthWrapper,
} from "@/features/auth/components/layout/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ICreateAccountPage {
  searchParams: Promise<{ callbackUrl: string }>
}

export default async function CreateAccountPage({
  searchParams,
}: ICreateAccountPage) {
  const { callbackUrl } = await searchParams

  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <SignupForm redirect={callbackUrl} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
