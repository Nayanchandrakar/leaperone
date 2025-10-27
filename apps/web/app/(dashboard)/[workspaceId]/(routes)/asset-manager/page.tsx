"use client"

import { AssetManagerActions } from "@/features/dashboard/components/pages/asset-manager/asset-manager-actions"
import { AssetManagerToolbar } from "@/features/dashboard/components/pages/asset-manager/asset-manager-toolbar"
import { AssetManagerView } from "@/features/dashboard/components/pages/asset-manager/asset-manager-view"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

// import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default function AssetManagerPage({ params }: Props) {
  console.log(params)

  // const pipeline = await DashboardPipeline.init(params)
  // await pipeline.checkMembership()
  // await pipeline.checkPermissions(["manage:members"])
  // await pipeline.checkSubscription()

  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <AssetManagerToolbar />
      <AssetManagerActions />
      <AssetManagerView />
    </DashboardContainer>
  )
}
