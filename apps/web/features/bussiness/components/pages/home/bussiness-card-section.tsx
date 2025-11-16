import { CardEditor } from "@/features/bussiness/components/editor/bussiness-card/card-editor"
import { CardPreview } from "@/features/bussiness/components/editor/bussiness-card/card-preview"

export const BussinessCardSection = () => {
  return (
    <div className="container my-28 grid grid-cols-[1.6fr_minmax(355px,0.4fr)] gap-11">
      <CardEditor />
      <CardPreview />
    </div>
  )
}
