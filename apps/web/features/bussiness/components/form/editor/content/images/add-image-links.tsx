import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { generateUUID } from "@/utils"

interface AddImageLinksFormProps {
  index: number
}

export function AddImageLinksForm({ index }: AddImageLinksFormProps) {
  const pushItem = useContentEditorStore((state) => state.pushItem)

  const handleAddImage = useCallback(() => {
    pushItem(index, ["images"], {
      id: generateUUID(),
      imageSrc: "https://images.pexels.com/photos/7004737/pexels-photo-7004737.jpeg",
      title: "",
      link: "",
    })
  }, [index, pushItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddImage}>
      <PlusIcon className="w-4 h-4" />
      Add another Image
    </Button>
  )
}
