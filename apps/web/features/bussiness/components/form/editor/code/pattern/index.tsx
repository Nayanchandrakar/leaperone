import { useShallow } from "zustand/react/shallow"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_PATTERN_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrPatternForm() {
  const { patternStyle, setPatternStyle } = useQrCodeEditorStore(
    useShallow((state) => ({
      patternStyle: state.settings.patternStyle,
      setPatternStyle: state.setPatternStyle,
    })),
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
          onItemSelect={(item) => setPatternStyle(item.value)}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
