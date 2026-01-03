import type { Contact } from "@app/core/types"
import { memo } from "react"
import { ContactIcons } from "@/features/bussiness/components/shared/contact-icons"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"
import { contactLinkFormatter } from "@/features/preview/utils/contact-link-formatter"

type QuickActionProps = {
  contacts: {
    list: Contact[]
    enabled: boolean
  }
}

type QuickActionsListProps = {
  list: Contact[]
}

export const QuickActions = memo(({ contacts }: QuickActionProps) => {
  if (!contacts.enabled || contacts.list.length === 0) return null

  return (
    <nav className="max-w-60 xs:max-w-78 mx-auto flex flex-wrap gap-4 xs:gap-6 my-7">
      <QuickActionsList list={contacts.list} />
    </nav>
  )
})

const QuickActionsList = ({ list }: QuickActionsListProps) => {
  return list.map((item) => (
    <QuickActionItem id={item.id} key={item.id} type={item.type} value={item.value} />
  ))
}

const QuickActionItem = ({ id, type, value }: Contact) => {
  const href = contactLinkFormatter?.[type]?.(value) ?? value

  return (
    <a key={id} target="_blank" rel="noopener noreferrer" href={href}>
      <IconBadge
        Icon={ContactIcons[type]}
        className="size-12 xs:size-15"
        iconClassName="size-5 xs:size-7"
      />
    </a>
  )
}
