import type { ImageLink } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import { generateUUID } from "@/utils"

interface AddImageLinksFormProps {
  index: number
}

export function AddImageLinksForm({ index }: AddImageLinksFormProps) {
  const { addItem } = useSubSectionList<ImageLink>(index, ["images"])

  const handleAddImage = useCallback(() => {
    addItem({
      link: "",
      title: "",
      id: generateUUID(),
      imageSrc: "https://images.pexels.com/photos/7004737/pexels-photo-7004737.jpeg",
    })
  }, [addItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddImage}>
      <PlusIcon className="w-4 h-4" />
      Add another Image
    </Button>
  )
}
