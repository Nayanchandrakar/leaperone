"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { TEAM_PRICING } from "@/features/subscription/constants/pricing/team-pricing"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import { resolvePricingTier } from "@/features/subscription/utils"

export function TeamPricingOptions() {
  const { setTeamPricing, teamPricing } = useTeamPricingStore(
    useShallow((state) => ({
      teamPricing: state.teamPricing,
      setTeamPricing: state.setTeamPricing,
    })),
  )

  const handleValueChange = useCallback(
    (id: string) => {
      const tier = resolvePricingTier(id)
      setTeamPricing(tier)
    },
    [setTeamPricing],
  )

  return (
    <Select value={teamPricing.id} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TEAM_PRICING.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
