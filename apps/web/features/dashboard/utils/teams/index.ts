import type { InvitationStatus } from "@app/database/types"

export function getStatusColor(status: InvitationStatus, isRestricted: boolean) {
  // If invitation has expired and is still pending, show red color
  if (isRestricted) {
    return "#ef4444"
  }

  switch (status) {
    case "accepted":
      return "#22c55e"
    case "pending":
      return "#eab308"
    default:
      return "#6b7280"
  }
}
