import { useMemo } from "react"
import type { InvitedMember } from "@/types/api-types"

interface UseFilteredMembersProps {
  query: string
  members: InvitedMember[]
}

export const useFilteredMembers = ({ members, query }: UseFilteredMembersProps) => {
  // Memoize the normalized query and searching state to avoid recalculating on every render
  const { normalizedQuery, isSearching } = useMemo(() => {
    const trimmedQuery = query.trim()
    const normalizedQuery = trimmedQuery.toLowerCase()
    const isSearching = trimmedQuery.length > 0
    return { normalizedQuery, isSearching }
  }, [query])

  const filteredMembers = useMemo(() => {
    // Early return if not searching
    if (!isSearching) return members

    return members.filter((member) => {
      // Pre-compute lowercase values once per member
      const nameLower = member.name?.toLowerCase()
      const roleLower = member.jobRole?.toLowerCase()

      // Use early return for better performance
      return Boolean(nameLower?.includes(normalizedQuery) || roleLower?.includes(normalizedQuery))
    })
  }, [members, normalizedQuery, isSearching])

  const hasSearchResults = filteredMembers.length > 0

  return {
    isSearching,
    filteredMembers,
    hasSearchResults,
  }
}
