import { Button } from "@app/ui/components/button"
import { Field } from "@app/ui/components/field"
import type { QrCodeEditorSchema } from "@app/zod/types"
import { UploadIcon } from "lucide-react"
import { Icons } from "@/components/shared/icons"
import { withForm } from "@/components/ui/app-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"

export const QrLogoForm = withForm({
  props: {},
  defaultValues: {} as QrCodeEditorSchema,
  render: function Render() {
    return (
      <EditorBlockItem value="qr-logo-form">
        <EditorBlockHeader>
          <EditorBlockTitle>Logo</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent className="max-w-3xl mx-auto ">
          <div className="flex items-center justify-between gap-5  flex-col @md/editor-block-content:flex-row">
            {/* Description */}
            <Field orientation="horizontal" className="gap-2">
              <Icons.standardQrCode className="size-26 shrink-0" />
              <p className="text-xs font-normal text-muted-foreground max-w-70 text-balance">
                Adding your logo to your QR code grabs attention and boosts brand recognition,
                making it instantly memorable.
              </p>
            </Field>

            {/* Upload Logo */}
            <div className="flex flex-col items-center gap-2">
              <Button variant="green-outline" className="px-6">
                <UploadIcon />
                Upload Logo
              </Button>
              <p className="text-[11px] font-medium text-muted-foreground">
                Square Image Recommend
              </p>
            </div>
          </div>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
