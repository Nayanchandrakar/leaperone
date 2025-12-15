import { useShallow } from "zustand/react/shallow"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_SHAPE_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrShapeForm() {
  const { bodyShape, setBodyShape } = useQrCodeEditorStore(
    useShallow((state) => ({
      setBodyShape: state.setBodyShape,
      bodyShape: state.settings.bodyShape,
    })),
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
          onItemSelect={(item) => setBodyShape(item.value)}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
