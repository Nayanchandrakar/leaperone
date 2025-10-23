import { Fragment } from "react"
import { handleAuth } from "@/actions/utils"
import { APP_URL } from "@/constants/app"
import { SignupForm } from "@/features/auth/components/forms/sign-up"
import { AuthContent, AuthForm, AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ICreateAccountPage {
  searchParams: Promise<{ callbackUrl: string }>
}

export default async function CreateAccountPage({ searchParams }: ICreateAccountPage) {
  const [{ callbackUrl = APP_URL }] = await Promise.all([
    searchParams,
    handleAuth({ mode: "block" }),
  ])

  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <SignupForm callbackUrl={callbackUrl} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
