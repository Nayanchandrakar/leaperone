import { memo, useMemo } from "react"
import { createPortal } from "react-dom"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { IFRAME_HTML } from "@/features/preview/constants/iframe-html"
import { useIframeBody } from "@/features/preview/hooks/use-iframe-body"
import { useIframeFont } from "@/features/preview/hooks/use-iframe-font"

export const MobileSandbox = memo(() => {
  const { body, iframeRef } = useIframeBody()
  const design = useDesignEditorStore((state) => state.config)

  // Load fonts dynamically in the iframe
  useIframeFont(iframeRef, design?.font)

  const portalContent = useMemo(
    () =>
      body
        ? createPortal(<TemplateRenderer template="classic" design={design} mode="preview" />, body)
        : null,
    [body, design],
  )

  return (
    <iframe
      ref={iframeRef}
      srcDoc={IFRAME_HTML}
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
