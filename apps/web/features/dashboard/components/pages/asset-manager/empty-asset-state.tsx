import {
  AssetPromptAction,
  AssetPromptDescription,
  AssetPromptTitle,
} from "@/features/dashboard/components/ui/asset-prompt-action"

export const EmptyAssetState = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <AssetPromptAction>
        <AssetPromptTitle>No files uploaded yet</AssetPromptTitle>
        <AssetPromptDescription>
          To upload, click on New Upload button or drop files/folders here
        </AssetPromptDescription>
      </AssetPromptAction>
    </div>
  )
}
