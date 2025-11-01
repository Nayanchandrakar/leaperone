import { FileUploadButton } from "@/features/dashboard/components/buttons/asset-manager/file-upload-button"
import { SearchBar } from "@/features/dashboard/components/pages/asset-manager/search-bar"

export const Toolbar = () => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
      <SearchBar />
      <FileUploadButton />
    </div>
  )
}
