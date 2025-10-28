import { AssetManagerActions } from "@/features/dashboard/components/pages/asset-manager/asset-manager-actions"
import { AssetManagerToolbar } from "@/features/dashboard/components/pages/asset-manager/asset-manager-toolbar"
import { AssetManagerView } from "@/features/dashboard/components/pages/asset-manager/asset-manager-view"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

// import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function AssetManagerPage({ params }: Props) {
  // const pipeline = await DashboardPipeline.init(params)
  // await pipeline.checkMembership()
  // await pipeline.checkPermissions(["manage:members"])
  // await pipeline.checkSubscription()

  const { workspaceId } = await params

  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <AssetManagerToolbar />
      <AssetManagerActions />
      <AssetManagerView workspaceId={workspaceId} />
    </DashboardContainer>
  )
}
