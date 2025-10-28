import { AssetManagerCard } from "../../cards/asset-manager/asset-card"

interface ShowAssetProps {
  data: unknown[]
}

export const ShowAssets = ({ data }: ShowAssetProps) => {
  return (
    <div className="mt-8 overflow-y-scroll size-full max-h-screen p-3">
      <div className="grid grid-cols-4 gap-6">
        {data.map((file, index) => {
          return <AssetManagerCard key={index} file={file} />
        })}
      </div>
    </div>
  )
}
