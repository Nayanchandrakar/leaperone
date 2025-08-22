import { Fragment } from "react"
import { LoginForm } from "@/features/auth/components/forms/login"
import {
  AuthContent,
  AuthForm,
  AuthWrapper,
} from "@/features/auth/components/layout/auth-layout"
import { BackButton } from "@/features/auth/components/ui/back-button"

interface ILoginPage {
  searchParams: Promise<{ callbackURL: string | undefined }>
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  const { callbackURL } = await searchParams
  return (
    <Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <LoginForm callbackURL={callbackURL} />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>login page content</AuthWrapper>
      </AuthContent>
    </Fragment>
  )
}
