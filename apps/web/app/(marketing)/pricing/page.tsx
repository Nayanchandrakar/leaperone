import { auth } from "@/features/auth/actions/auth"

export default async function PricingPage() {
  const session = await auth()
  return <div>{JSON.stringify(session)}</div>
}
