import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"

export const AssetManagerFilter = () => {
  return (
    <div className="mt-8 flex items-center gap-4">
      <div className="flex items-center justify-center border border-dashed border-red-500 gap-4">
        <span className="text-muted-foreground text-sm">Type:</span>
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
      </div>

      <div className="flex items-center justify-center border border-dashed border-red-500 gap-4">
        <span className="text-muted-foreground text-sm">Sort by:</span>
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
      </div>
    </div>
  )
}
