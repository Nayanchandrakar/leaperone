import type { PdfFile } from "@app/types"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import { generateUUID } from "@/utils"

interface AddPdfFileProps {
  index: number
}

export const AddPdfFile = ({ index }: AddPdfFileProps) => {
  const { addItem } = useSubSectionList<PdfFile>(index, ["files"])

  const handleAddPdfFile = useCallback(() => {
    addItem({
      id: generateUUID(),
      title: {
        text: "",
        enabled: true,
      },
      subTitle: {
        text: "",
        enabled: true,
      },
      fileSrc: "",
      thumbnail: "https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg",
    })
  }, [addItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddPdfFile}>
      <PlusIcon />
      Add more PDF
    </Button>
  )
}
