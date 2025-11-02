import { Filters } from "@/features/dashboard/components/pages/asset-manager/filters"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { Toolbar } from "@/features/dashboard/components/pages/asset-manager/toolbar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

// import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function AssetManagerPage({ params }: Props) {
  const { workspaceId } = await params
  // const pipeline = await DashboardPipeline.init(params)
  // await pipeline.checkMembership()
  // await pipeline.checkPermissions(["manage:members"])
  // await pipeline.checkSubscription()

  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <Toolbar />
      <Filters workspaceId={workspaceId} />
      <RenderFiles workspaceId={workspaceId} />
    </DashboardContainer>
  )
}
