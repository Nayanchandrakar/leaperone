import { ResetPasswordForm } from "@/features/auth/components/forms/reset-password"
import { authRepository } from "@/features/auth/repository/auth"
import type { IResetPasswordPage } from "@/features/auth/types"

// TODO: improve the ui part here for errors
export const ValidateResetToken = async ({ params }: IResetPasswordPage) => {
  const { token } = await params
  const identifier = `reset-password:${token}`

  const verification =
    await authRepository.findVerificationByIdentifier(identifier)

  if (!verification) {
    return <div>No verification code found</div>
  }

  if (verification.expiresAt < new Date()) {
    return <div> Your verification code has been expired </div>
  }

  return <ResetPasswordForm token={token} />
}
