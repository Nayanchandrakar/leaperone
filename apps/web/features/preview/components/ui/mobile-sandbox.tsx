import { memo, useMemo } from "react"
import { createPortal } from "react-dom"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { IFRAME_HTML } from "@/features/preview/constants/iframe-html"
import { useIframeBody } from "@/features/preview/hooks/use-iframe-body"
import { useIframeFont } from "@/features/preview/hooks/use-iframe-font"
import { separateSections } from "@/features/preview/utils/seperate-sections"

export const MobileSandbox = memo(() => {
  const { body, iframeRef } = useIframeBody()
  const design = useDesignEditorStore((state) => state.config)
  const { sections, template } = useContentEditorStore(
    useShallow((state) => ({
      sections: state.sections,
      template: state.template,
    })),
  )
  const { floatingButton, mainSections } = useMemo(() => separateSections(sections), [sections])

  // Load fonts dynamically in the iframe
  useIframeFont(iframeRef, design?.font)

  const portalContent = useMemo(
    () =>
      body
        ? createPortal(
            <TemplateRenderer
              mode="preview"
              design={design}
              template={template}
              contents={mainSections}
              floating={floatingButton!}
            />,
            body,
          )
        : null,
    [body, mainSections, floatingButton, design, template],
  )

  return (
    <iframe
      ref={iframeRef}
      srcDoc={IFRAME_HTML}
      key="mobile-preview-iframe"
      className="size-full border-none"
      aria-label="Mobile Preview Sandbox"
      title="Business card visual preview"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-same-origin allow-scripts"
    >
      {portalContent}
    </iframe>
  )
})
