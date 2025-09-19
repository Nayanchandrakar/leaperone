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
import { TEAM_PRICING_TIERS } from "@/features/subscription/constants/pricing/team-pricing-tiers"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"
import { resolvePricingTier } from "@/features/subscription/utils"

export const PricingTierSelect = () => {
  const { pricingTier, setPricingTier } = usePricingStore(
    useShallow((state) => ({
      pricingTier: state.pricingTier,
      setPricingTier: state.setPricingTier,
    })),
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary dep
  const handleValueChange = useCallback((id: string) => {
    const tier = resolvePricingTier(id)
    setPricingTier(tier)
  }, [])

  return (
    <Select value={pricingTier.id} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TEAM_PRICING_TIERS.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
