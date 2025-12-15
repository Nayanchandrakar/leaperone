import { useShallow } from "zustand/react/shallow"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_FRAME_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrFrameForm() {
  const { cornerStyle, setCornerStyle } = useQrCodeEditorStore(
    useShallow((state) => ({
      cornerStyle: state.settings.cornerStyle,
      setCornerStyle: state.setCornerStyle,
    })),
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
          onItemSelect={(item) => setCornerStyle(item.value)}
        />
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
