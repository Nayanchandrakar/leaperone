import type { QrCodeEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { QrCodeItemList } from "@/features/bussiness/components/form/editor/code/shape/qr-code-ltem-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_FRAME_ITEMS } from "@/features/bussiness/constants/home/qr-code-settings"

export const QrFrameForm = withForm({
  props: {},
  defaultValues: {} as QrCodeEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="qr-frame-form">
        <EditorBlockHeader>
          <EditorBlockTitle>Eye Shape & Frame</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <form.AppField
            name="cornerStyle"
            children={(field) => (
              <QrCodeItemList
                items={QR_FRAME_ITEMS}
                currentValue={field.state.value}
                onItemSelect={(item) => {
                  field.handleChange(item.value)
                }}
              />
            )}
          />
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
