"use client"

import { FileUploadProgress } from "@/features/dashboard/components/pages/asset-manager/file-upload-progress"
import { RenderFileCardSkeletons } from "@/features/dashboard/components/pages/asset-manager/render-file-card-skeletons"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { useFilesQuery } from "@/features/dashboard/hooks/asset-manager/use-files-query"

export const AssetManagerFiles = () => {
  const { data, isLoading } = useFilesQuery()

  return (
    <div className="mt-8 overflow-y-scroll size-full max-h-screen p-3">
      <div className="grid grid-cols-4 gap-6">
        <FileUploadProgress />
        {isLoading ? <RenderFileCardSkeletons /> : <RenderFiles data={data!} />}
      </div>
    </div>
  )
}
