import { useCallback } from "react"
import { ListComponent } from "@/components/shared/list-component"
import { QrCodeItemCard } from "@/features/bussiness/components/cards/home/qr-code-item"
import type { QrCodeItem } from "@/features/bussiness/types"

interface QrCodeItemListProps<T extends string> {
  currentValue: string
  items: QrCodeItem<T>[]
  onItemSelect: (item: QrCodeItem<T>) => void
}

export function QrCodeItemList<T extends string>({
  items,
  currentValue,
  onItemSelect,
}: QrCodeItemListProps<T>) {
  const isItemSelected = useCallback(
    (item: QrCodeItem<T>) => currentValue === item.value,
    [currentValue],
  )
  return (
    <ListComponent
      items={items}
      className="flex gap-4 flex-wrap"
      renderItem={(item, idx) => (
        <QrCodeItemCard
          label={item.label}
          key={`qr-${item.value}-${idx}`}
          data-state={isItemSelected(item)}
          onClick={() => onItemSelect(item)}
        >
          <item.icon className="size-26" />
        </QrCodeItemCard>
      )}
    />
  )
}
