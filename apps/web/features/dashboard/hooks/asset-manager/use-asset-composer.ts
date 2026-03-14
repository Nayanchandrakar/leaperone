"use client"

import { use } from "react"
import { AssetComposerContext } from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"

export function useAssetComposer() {
  const context = use(AssetComposerContext)
  if (!context) throw new Error("useAssetComposer must be used within AssetComposerProvider")
  return context
}
