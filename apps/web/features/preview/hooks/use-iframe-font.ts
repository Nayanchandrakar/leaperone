import type { Font } from "@app/core/types"
import type React from "react"
import { useEffect } from "react"
import { getGoogleFontsUrl, isSystemFont } from "@/features/preview/utils/font-utils"

/**
 * Hook to inject Google Fonts dynamically into an iframe's head
 * This ensures fonts are loaded efficiently when they change
 */
export function useIframeFont(iframeRef: React.RefObject<HTMLIFrameElement | null>, font: Font) {
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const iframeDoc = iframe.contentDocument
    if (!iframeDoc) return

    // Skip system fonts
    if (isSystemFont(font.family)) return

    const googleFontHref = getGoogleFontsUrl(font)

    const head = iframeDoc.head

    // Remove existing dynamic font links to avoid duplicates
    const existingLinks = head.querySelectorAll('link[data-dynamic-font="true"]')
    existingLinks.forEach((link) => {
      link.remove()
    })

    // Create and inject font stylesheet
    const fontLink = iframeDoc.createElement("link")
    fontLink.rel = "stylesheet"
    fontLink.href = googleFontHref
    fontLink.media = "all"
    fontLink.setAttribute("data-dynamic-font", "true")
    head.appendChild(fontLink)

    // Also add preload for faster loading
    const preloadLink = iframeDoc.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.as = "style"
    preloadLink.href = googleFontHref
    preloadLink.setAttribute("data-dynamic-font", "true")
    head.insertBefore(preloadLink, head.firstChild)
  }, [iframeRef, font])
}
