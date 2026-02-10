import type { BusinessCardStatus } from "@app/database/types"

export const STAUS_TOOLTIP_CONTENT: Record<BusinessCardStatus, string> = {
  active: "Business card is active and visible to others",
  inactive: "Business card is inactive and not visible",
}
