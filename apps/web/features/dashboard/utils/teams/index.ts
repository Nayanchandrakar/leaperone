import type { InvitationStatus } from "@app/database/types"

export function getStatusColor(status: InvitationStatus, expiresAt: Date) {
  const isExpired = new Date(expiresAt) < new Date()

  if (isExpired && status === "pending") return "#ef4444"

  switch (status) {
    case "accepted":
      return "#22c55e"
    case "pending":
      return "#eab308"
    default:
      return "#6b7280"
  }
}
