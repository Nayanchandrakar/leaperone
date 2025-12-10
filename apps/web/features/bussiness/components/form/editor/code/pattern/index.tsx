import { useCallback } from "react"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_PATTERN_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import {
  useQrCodeEditorStore,
  useQrCodePatternStyle,
} from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrPatternForm() {
  const patternStyle = useQrCodePatternStyle()
  const setPatternStyle = useQrCodeEditorStore((state) => state.setPatternStyle)

  const handleItemSelect = useCallback(
    (item: (typeof QR_PATTERN_ITEMS)[number]) => {
      setPatternStyle(item.value)
    },
    [setPatternStyle],
  )

  return (
    <EditorBlockItem value="qr-pattern-form">
      <EditorBlockHeader>
        <EditorBlockTitle>Body Pattern</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <QrCodeItemList
          items={QR_PATTERN_ITEMS}
          currentValue={patternStyle}
          onItemSelect={handleItemSelect}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
