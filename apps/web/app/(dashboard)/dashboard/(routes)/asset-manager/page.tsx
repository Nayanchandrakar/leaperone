import { FilePreviewDialog } from "@/features/dashboard/components/dialogs/asset-manager/file-preview"
import { AssetFilters } from "@/features/dashboard/components/pages/asset-manager/asset-filters"
import { AssetToolBar } from "@/features/dashboard/components/pages/asset-manager/asset-toolbar"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AssetManagerPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <AssetToolBar />
      <AssetFilters />
      <RenderFiles className="max-h-screen" />
      <FilePreviewDialog />
    </DashboardContainer>
  )
}
