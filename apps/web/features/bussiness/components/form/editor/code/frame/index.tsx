import { useCallback } from "react"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_FRAME_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import {
  useQrCodeCornerStyle,
  useQrCodeEditorStore,
} from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrFrameForm() {
  const cornerStyle = useQrCodeCornerStyle()
  const setCornerStyle = useQrCodeEditorStore((state) => state.setCornerStyle)

  const handleItemSelect = useCallback(
    (item: (typeof QR_FRAME_ITEMS)[number]) => {
      setCornerStyle(item.value)
    },
    [setCornerStyle],
  )

  return (
    <EditorBlockItem value="qr-frame-form">
      <EditorBlockHeader>
        <EditorBlockTitle>Eye Shape & Frame</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <QrCodeItemList
          items={QR_FRAME_ITEMS}
          currentValue={cornerStyle}
          onItemSelect={handleItemSelect}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
