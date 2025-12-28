import { useCallback, useEffect, useRef, useState } from "react"

export const useIframeBody = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [body, setBody] = useState<HTMLElement | null>(null)

  const handleIframeLoad = useCallback(() => {
    const bodyElement = iframeRef.current?.contentDocument?.body ?? null
    setBody((prev) => (prev !== bodyElement ? bodyElement : prev))
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    if (iframe.contentDocument?.readyState === "complete") {
      handleIframeLoad()
      return
    }

    iframe.addEventListener("load", handleIframeLoad, { passive: true })
    return () => {
      iframe.removeEventListener("load", handleIframeLoad)
    }
  }, [handleIframeLoad])

  return { body, iframeRef }
}
