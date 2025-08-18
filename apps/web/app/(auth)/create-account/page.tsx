import { AuthContainer } from "@/components/containers/auth/auth-container"
import { BackButton } from "@/components/pages/create-account/elements/back-button"
import { CreateAccountForm } from "@/components/pages/create-account/forms/create-account-form"

export default function CreateAccountPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 ">
      <AuthContainer className="relative">
        <BackButton />
        <CreateAccountForm />
      </AuthContainer>

      <div className="bg-[linear-gradient(190.37deg,#16A50B_3.55%,#0D9815_54.67%,#0B701D_100%)] relative hidden lg:block">
        content
      </div>
    </div>
  )
}
