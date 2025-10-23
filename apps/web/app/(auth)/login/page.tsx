import { Fragment } from "react"
import { handleAuth } from "@/actions/utils"
import { APP_URL } from "@/constants/app"
import { LoginForm } from "@/features/auth/components/forms/login"
import { AuthContent, AuthForm, AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ILoginPage {
  searchParams: Promise<{ callbackUrl: string }>
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  const [{ callbackUrl = APP_URL }] = await Promise.all([
    searchParams,
    handleAuth({ mode: "block" }),
  ])

  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <LoginForm callbackUrl={callbackUrl} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>login page content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
