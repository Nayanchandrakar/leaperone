import type { Font } from "@app/core/types"
import { useEffect, useRef } from "react"
import { getGoogleFontsUrl, isSystemFont } from "@/features/preview/utils/font-utils"

/**
 * Hook to dynamically load Google Fonts in an iframe's document head
 * Handles font loading, cleanup, and system font detection
 *
 * @param iframeRef - Ref to the iframe element (can be null)
 * @param font - Font configuration to load
 */
export const useIframeFont = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  font: Font | undefined,
) => {
  const currentFontLinkId = useRef<string | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !font) return

    const setupFont = () => {
      const iframeDocument = iframe.contentDocument
      if (!iframeDocument) return

      const head = iframeDocument.head
      const html = iframeDocument.documentElement
      if (!head || !html) return

      // Build font family with fallback stack for better CLS prevention
      const fontFamily = `"${font.family}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

      // Generate unique ID for this font link based on font family and weights
      const fontLinkId = `google-font-${font.family.replace(/\s+/g, "-").toLowerCase()}-${font.bodyWeight}-${font.buttonWeight}-${font.headingWeight}`

      // If the same font is already loaded, only update CSS custom properties (weights might have changed)
      if (currentFontLinkId.current === fontLinkId && !isSystemFont(font.family)) {
        // Still update CSS properties in case weights changed
        html.style.setProperty("--font-template", fontFamily)
        html.style.setProperty("--font-body-weight", String(font.bodyWeight))
        html.style.setProperty("--font-heading-weight", String(font.headingWeight))
        html.style.setProperty("--font-button-weight", String(font.buttonWeight))
        return
      }

      // Set CSS custom properties on the html element so they're available throughout the document
      // This ensures the font is applied even before the portal content renders
      html.style.setProperty("--font-template", fontFamily)
      html.style.setProperty("--font-body-weight", String(font.bodyWeight))
      html.style.setProperty("--font-heading-weight", String(font.headingWeight))
      html.style.setProperty("--font-button-weight", String(font.buttonWeight))

      // Skip loading external fonts for system fonts
      if (isSystemFont(font.family)) {
        // Remove any existing font link if switching to system font
        if (currentFontLinkId.current) {
          const existingLink = head.querySelector(`#${currentFontLinkId.current}`)
          if (existingLink) {
            existingLink.remove()
            currentFontLinkId.current = null
          }
        }
        return
      }

      // Remove old font link if it exists
      if (currentFontLinkId.current) {
        const oldLink = head.querySelector(`#${currentFontLinkId.current}`)
        if (oldLink) {
          oldLink.remove()
        }
      }

      // Create new font link
      const fontUrl = getGoogleFontsUrl(font)
      const link = iframeDocument.createElement("link")
      link.id = fontLinkId
      link.rel = "stylesheet"
      link.href = fontUrl
      link.crossOrigin = "anonymous"

      // Add to head
      head.appendChild(link)
      currentFontLinkId.current = fontLinkId
    }

    // Define load handler with stable reference for cleanup
    const handleLoad = () => {
      setupFont()
    }

    // Try to set up immediately if document is ready
    if (iframe.contentDocument?.readyState === "complete") {
      setupFont()
    } else {
      // Wait for iframe to load
      iframe.addEventListener("load", handleLoad)
    }

    // Cleanup function for when font changes or component unmounts
    return () => {
      // Remove load event listener
      iframe.removeEventListener("load", handleLoad)

      // Clean up CSS custom properties and font links
      const iframeDocument = iframe.contentDocument
      if (iframeDocument) {
        const html = iframeDocument.documentElement
        const head = iframeDocument.head
        if (head && currentFontLinkId.current) {
          const linkToRemove = head.querySelector(`#${currentFontLinkId.current}`)
          if (linkToRemove) {
            linkToRemove.remove()
            currentFontLinkId.current = null
          }
        }
        if (html) {
          html.style.removeProperty("--font-template")
          html.style.removeProperty("--font-body-weight")
          html.style.removeProperty("--font-heading-weight")
          html.style.removeProperty("--font-button-weight")
        }
      }
    }
  }, [iframeRef, font])
}
