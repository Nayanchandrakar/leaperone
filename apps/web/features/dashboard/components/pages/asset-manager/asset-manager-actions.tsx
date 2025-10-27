import { Button } from "@app/ui/components/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"

export const AssetManagerActions = () => {
  return (
    <div className="mt-8 flex items-center gap-4">
      <SortFilterBar>
        <SortFilterBarLabel>Type:</SortFilterBarLabel>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All (5)</SelectItem>
              <SelectItem value="images">Images (5)</SelectItem>
              <SelectItem value="pdfs">PDFs (5)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SortFilterBar>

      <SortFilterBar>
        <SortFilterBarLabel>Sort by:</SortFilterBarLabel>
        <Select defaultValue="newest">
          <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="atoz">A to Z</SelectItem>
              <SelectItem value="ztoa">Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SortFilterBar>

      <Button variant="gray-outline">Select Multiple Files</Button>

      <Button variant="gray-outline">Select All</Button>

      <Button variant="destructive" className="min-w-32">
        Delete
      </Button>
    </div>
  )
}
