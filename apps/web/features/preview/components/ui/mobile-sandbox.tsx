import { memo, useMemo } from "react"
import { createPortal } from "react-dom"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { IFRAME_HTML } from "@/features/preview/constants/iframe-html"
import { useIframeBody } from "@/features/preview/hooks/use-iframe-body"
import { useIframeFont } from "@/features/preview/hooks/use-iframe-font"

/**
 * Mobile sandbox component that renders the preview inside an isolated iframe
 * Font loading is optimized with:
 * - Proper preload order in useIframeFont hook
 * - FOIT prevention CSS in IFRAME_HTML
 * - Proper fallback fonts in ThemeContainer
 */
export const MobileSandbox = memo(() => {
  const { body, iframeRef } = useIframeBody()
  const design = useDesignEditorStore((state) => state.config)

  // Dynamically inject font into iframe with optimized loading
  useIframeFont(iframeRef, design.font)

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
