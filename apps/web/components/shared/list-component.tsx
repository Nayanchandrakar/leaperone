import { cn } from "@app/ui/lib/utils"

interface ListComponentProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

const ListComponent = <T,>({ items, renderItem, className }: ListComponentProps<T>) => {
  return (
    <div className={cn(className)}>
      {items?.map((item, index) => {
        return renderItem(item, index)
      })}
    </div>
  )
}

export { ListComponent }
