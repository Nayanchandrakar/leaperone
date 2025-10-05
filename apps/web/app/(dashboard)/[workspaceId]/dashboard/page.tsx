import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardPage({ params }: Props) {
  const auth = await DashboardPipeline.init(params)
  await auth.checkMembership()
  await auth.checkSubscription()

  return (
    <div>
      Dashboard page {JSON.stringify(auth.context.member)}
      {JSON.stringify(auth.context.subscription)}
    </div>
  )
}
