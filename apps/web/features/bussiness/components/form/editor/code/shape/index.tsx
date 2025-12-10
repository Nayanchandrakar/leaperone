import { useCallback } from "react"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_SHAPE_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import {
  useQrCodeBodyShape,
  useQrCodeEditorStore,
} from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrShapeForm() {
  const bodyShape = useQrCodeBodyShape()
  const setBodyShape = useQrCodeEditorStore((state) => state.setBodyShape)

  const handleItemSelect = useCallback(
    (item: (typeof QR_SHAPE_ITEMS)[number]) => {
      setBodyShape(item.value)
    },
    [setBodyShape],
  )

  return (
    <EditorBlockItem value="qr-shape-form">
      <EditorBlockHeader>
        <EditorBlockTitle>QR Shape</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <QrCodeItemList
          items={QR_SHAPE_ITEMS}
          currentValue={bodyShape}
          onItemSelect={handleItemSelect}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
