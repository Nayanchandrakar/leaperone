import { useShallow } from "zustand/react/shallow"
import { FontsList } from "@/features/bussiness/components/form/editor/design/font/fonts-list"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { FontSection, FontSectionTitle } from "@/features/bussiness/components/ui/fonts-section"
import { CLASSIC_FONTS, FANCY_FONTS, MODERN_FONTS } from "@/features/bussiness/constants/home/fonts"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"

export function FontChangeForm() {
  const { selectedFontId, setFont } = useDesignEditorStore(
    useShallow((state) => ({
      setFont: state.setFont,
      selectedFontId: state?.config?.font?.id,
    })),
  )

  return (
    <EditorBlockItem value="font-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Font</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent className="space-y-5">
        <FontSection>
          <FontSectionTitle>Modern</FontSectionTitle>
          <FontsList
            onFontChange={setFont}
            fontOptions={MODERN_FONTS}
            selectedFontId={selectedFontId}
          />
        </FontSection>
        <FontSection>
          <FontSectionTitle>Classic</FontSectionTitle>
          <FontsList
            onFontChange={setFont}
            fontOptions={CLASSIC_FONTS}
            selectedFontId={selectedFontId}
          />
        </FontSection>
        <FontSection>
          <FontSectionTitle>Fancy</FontSectionTitle>
          <FontsList
            onFontChange={setFont}
            fontOptions={FANCY_FONTS}
            selectedFontId={selectedFontId}
          />
        </FontSection>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
