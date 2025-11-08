"use client"

import { useState } from "react"
import { SettingCard } from "@/features/dashboard/components/cards/team-settings/setting-card"

export const TeamSettings = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckedChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <section className="mt-8 space-y-3">
      <SettingCard
        title="Digital business card creating & editing"
        description="Allow invited team members to create and edit their digital business card"
        isChecked={isChecked}
        handleCheckedChange={handleCheckedChange}
      />

      <SettingCard
        title="Allow to update form Terms & Privacy settings"
        description="By default team members form Terms & Privacy will be same as your, if you allow they can update it"
        isChecked={isChecked}
        handleCheckedChange={handleCheckedChange}
      />
    </section>
  )
}
