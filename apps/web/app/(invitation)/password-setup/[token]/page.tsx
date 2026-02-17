import { Fragment } from "react"
// import { getSession } from "@/actions/utils"
import { LegalFooter } from "@/components/shared/legal-footer"
// import { redis } from "@/config/redis"
import { PasswordSetupForm } from "@/features/invitation/components/forms/join"

interface PasswordSetupPageProps {
  params: Promise<{ token: string }>
}

export default async function PasswordSetupPage({ params }: PasswordSetupPageProps) {
  // const [session, { token }] = await Promise.all([getSession(), params])
  const { token } = await params
  // if (session) {
  //   return <div>Unauthorized</div>
  // }

  // const inviteKey = getInviteKey(token)
  // const invitationId = await redis.get<string>(inviteKey)

  // if (!invitationId) {
  //   return <div>Invalid token</div>
  // }

  return (
    <Fragment>
      <PasswordSetupForm token={token} />
      <LegalFooter />
    </Fragment>
  )
}
