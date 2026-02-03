import { FilePreviewDialog } from "@/features/dashboard/components/dialogs/asset-manager/file-preview"
import { Filters } from "@/features/dashboard/components/pages/asset-manager/filters"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { Toolbar } from "@/features/dashboard/components/pages/asset-manager/toolbar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AssetManagerPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <Toolbar />
      <Filters />
      <RenderFiles />
      <FilePreviewDialog />
    </DashboardContainer>
  )
}
