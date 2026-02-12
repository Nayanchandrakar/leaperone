import type { InvitationStatus } from "@app/database/types"

export function getStatusColor(status: InvitationStatus, expiresAt: string) {
  // If invitation has expired and is still pending, show red color
  if (status === "pending" && new Date(expiresAt) < new Date()) {
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
