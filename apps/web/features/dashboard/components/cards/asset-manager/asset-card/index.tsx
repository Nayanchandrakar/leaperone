import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import { AssetCardFooter } from "./asset-card-footer"
import { AssetCardImage } from "./asset-card-image"
import { AssetCardSelectionIndicator } from "./asset-card-selection-indicator"
import { AssetCardWrapper } from "./asset-card-wrapper"

export const AssetManagerCard = () => {
  const isSelected = false

  return (
    <AssetCardWrapper className={cn(isSelected && "outline-primary")}>
      {isSelected && <AssetCardSelectionIndicator />}
      <AssetCardImage />
      <Checkbox defaultChecked className="absolute top-2 right-2" />
      <AssetCardFooter />
    </AssetCardWrapper>
  )
}
