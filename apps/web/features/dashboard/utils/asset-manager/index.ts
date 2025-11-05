import { CLIENT_ENV } from "@app/env/web/client"
import { FILE_CATEGORIES } from "@/features/dashboard/constants/asset-manager/filter-options"

export function getCategoryTypes(fileCategory: string) {
  const category = FILE_CATEGORIES.find((f) => f.value === fileCategory)
  return (category?.types ?? []) as Array<string>
}

export function getAssetUrl(key: string) {
  return `${CLIENT_ENV.NEXT_PUBLIC_ASSET_CDN}/${key}`
}
