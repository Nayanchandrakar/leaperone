import type { ContentSectionType } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { memo, useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { SelectOption } from "@/features/bussiness/types"

const CONTENT_SECTIONS: SelectOption<ContentSectionType>[] = [
  {
    label: "Heading + Text",
    value: "heading-text",
  },
  {
    label: "Images + Texts + Links",
    value: "image-text-links",
  },
  {
    label: "Links: Social & More",
    value: "social-links",
  },
  {
    label: "Video",
    value: "video-section",
  },
  {
    label: "PDFs",
    value: "pdf-file-section",
  },
  {
    label: "Bussiness Hours",
    value: "bussiness-hour",
  },
  {
    label: "Button",
    value: "cta-button",
  },
  {
    label: "Team",
    value: "teams-section",
  },
  {
    label: "Testimonials",
    value: "testimonials-section",
  },
]

export const AddContentSectionButton = memo(() => {
  const addSection = useContentEditorStore((state) => state.addSection)

  const handleSelect = useCallback(
    (value: ContentSectionType) => {
      addSection(value)
    },
    [addSection],
  )

  return (
    <div data-slot="section-button" className="flex-center">
      <DropdownSelectButton options={CONTENT_SECTIONS} onSelect={handleSelect}>
        <Button className="w-fit">
          <PlusIcon className="w-4 h-4" />
          Add more Sections
        </Button>
      </DropdownSelectButton>
    </div>
  )
})
