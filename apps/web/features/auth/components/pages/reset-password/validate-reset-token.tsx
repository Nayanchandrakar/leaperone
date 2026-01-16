import { dbHttp } from "@app/database/adapters/http"
import { findVerificationByIdentifier } from "@app/database/repository/verification"
import { ResetPasswordForm } from "@/features/auth/components/forms/reset-password"
import type { IResetPasswordPage } from "@/features/auth/types"

// TODO: improve the ui part here for errors
export const ValidateResetToken = async ({ params }: IResetPasswordPage) => {
  const { token } = await params
  const identifier = `reset-password:${token}`

  const verification = await findVerificationByIdentifier(dbHttp, identifier)

  if (!verification) {
    return <div>No verification code found</div>
  }

  if (verification.expiresAt < new Date()) {
    return <div> Your verification code has been expired </div>
  }

  return <ResetPasswordForm token={token} />
}
