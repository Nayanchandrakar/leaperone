import { memo, useMemo } from "react"
import { createPortal } from "react-dom"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { ClassicTemplate } from "@/features/preview/components/templates/classic"
import { useIframeBody } from "@/features/preview/hooks/use-iframe-body"

const isDev = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production"

const DEV_STYLESHEET = `<link rel="stylesheet" href="/_next/static/chunks/%5Broot-of-the-server%5D__2529b5cf._.css" data-precedence="next_static/chunks/[root-of-the-server]__2529b5cf._.css">`

const SRC_DOC = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    ${isDev && DEV_STYLESHEET}
    <link rel="stylesheet" href="/_next/static/chunks/d41ba60faff93bff.css" data-precedence="next">
    <link rel="stylesheet" href="/_next/static/chunks/e805e21f2b026e03.css" data-precedence="next">
    <link rel="preload" href="/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2" as="font" crossorigin="anonymous" type="font/woff2">
    <style>
      html { box-sizing: border-box; }
      *, *:before, *:after { box-sizing: inherit; }
      body { margin: 0; padding: 0; min-height: 100vh; background: #fff; }
    </style>
  </head>
  <body></body>
</html>
`

export const MobileSandbox = memo(() => {
  const { body, iframeRef } = useIframeBody()
  const design = useDesignEditorStore((state) => state.config)

  const portalContent = useMemo(
    () => (body ? createPortal(<ClassicTemplate data-preview design={design} />, body) : null),
    [body, design],
  )

  return (
    <iframe
      ref={iframeRef}
      srcDoc={SRC_DOC}
      className="size-full border-none"
      title="Business card visual preview"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-same-origin allow-scripts"
      aria-label="Mobile Preview Sandbox"
    >
      {portalContent}
    </iframe>
  )
})
