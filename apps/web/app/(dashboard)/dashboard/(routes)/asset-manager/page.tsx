import { FilePreviewDialog } from "@/features/dashboard/components/dialogs/asset-manager/file-preview"
import { FileComposerDefault } from "@/features/dashboard/components/pages/asset-manager/file-composer"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AssetManagerPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Files Upload Manager</DashboardTitle>
      <FileComposerDefault />
      <FilePreviewDialog />
    </DashboardContainer>
  )
}
