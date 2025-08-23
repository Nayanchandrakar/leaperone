import { Fragment } from "react"
import { LoginForm } from "@/features/auth/components/forms/login"
import {
  AuthContent,
  AuthForm,
  AuthWrapper,
} from "@/features/auth/components/layout/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ILoginPage {
  searchParams: Promise<{ callbackUrl: string }>
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  const { callbackUrl } = await searchParams
  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <LoginForm redirect={callbackUrl} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>login page content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
