import * as React from "react"
import {
  AuthContent,
  AuthForm,
  AuthWrapper,
} from "@/components/layouts/auth-layout"
import { BackButton } from "@/components/pages/create-account/elements/back-button"
import { CreateAccountForm } from "@/components/pages/create-account/forms/create-account-form"

export default function CreateAccountPage() {
  return (
    <React.Fragment>
      <AuthWrapper>
        <BackButton />
        <AuthForm>
          <CreateAccountForm />
        </AuthForm>
      </AuthWrapper>

      <AuthContent>
        <AuthWrapper>content</AuthWrapper>
      </AuthContent>
    </React.Fragment>
  )
}
