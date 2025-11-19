import {
  Panel,
  PanelContent,
  PanelItem,
  PanelSet,
  PanelTitle,
  PanelToogle,
  PanelTrigger,
} from "@app/ui/components/panel"
import { GripVertical } from "lucide-react"
import z from "zod"
import { useAppForm } from "@/components/ui/app-form"
import { usePanel } from "@/hooks/global/use-panel"

const formSchema = z.object({
  email: z.email(),
  enabled: z.boolean(),
  name: z.string().min(5),
  message: z.string().min(5),
})

export default function ContentEditor() {
  const { onTrigger, checkIsOpen } = usePanel({
    collapsible: true,
  })

  const form = useAppForm({
    defaultValues: {
      email: "",
      name: "hello",
      message: "world",
      enabled: true,
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
  })

  console.log(form)

  return (
    <Panel>
      <PanelItem open={checkIsOpen("content")}>
        <PanelTrigger>
          <PanelSet>
            <PanelToogle>
              <GripVertical />
            </PanelToogle>
            <PanelTitle>Content</PanelTitle>
          </PanelSet>

          <PanelSet>
            <PanelToogle onClick={() => onTrigger("content")} />
          </PanelSet>
        </PanelTrigger>
        <PanelContent>Something</PanelContent>
      </PanelItem>
    </Panel>
  )
}
