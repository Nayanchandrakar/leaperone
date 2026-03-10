"use client"

import { Button } from "@app/ui/components/button"

interface ProfileFieldProps {
  label: string
  value: string
  actionLabel: string
  onAction?: () => void
}

export function ProfileField({ label, value, actionLabel, onAction }: ProfileFieldProps) {
  return (
    <div className="grid gap-1">
      <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
      <dd className="flex items-center justify-between gap-4">
        <p className="font-medium text-sm text-muted-foreground max-w-36 sm:max-w-40 md:max-w-60 truncate">
          {value}
        </p>
        <Button variant="green-outline" onClick={onAction}>
          {actionLabel}
        </Button>
      </dd>
    </div>
  )
}
