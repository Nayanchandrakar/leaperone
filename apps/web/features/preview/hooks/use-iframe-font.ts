import type { Font } from "@app/types"
import { useEffect, useRef } from "react"
import { getGoogleFontsUrl } from "@/features/preview/utils/font-utils"

/**
 * Dynamically mount/unmount a Google Fonts <link> tag into the head of an iframe's document.
 *
 * This hook ONLY manages the <link> lifecycle for Google Fonts.
 * It deliberately does NOT touch html.style or CSS custom properties,
 * as those are handled elsewhere (such as ThemeContainer on <main>).
 *
 * If no valid font is provided or getGoogleFontsUrl returns null,
 * any previously injected font <link> will be removed.
 */
export const useIframeFont = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  font: Font | undefined,
) => {
  // Tracks the DOM id of the active <link> so we know what to clean up, even if font changes quickly
  const currentFontLinkId = useRef<string | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !font) return

    const fontUrl = getGoogleFontsUrl(font)

    // Clean up previous link if no url should be loaded
    if (!fontUrl) {
      if (currentFontLinkId.current) {
        iframe.contentDocument?.head?.querySelector(`#${currentFontLinkId.current}`)?.remove()
        currentFontLinkId.current = null
      }
      return
    }

    // Make a stable, unique DOM id for the <link> based on font params (e.g. "gf-inter-400-500-700")
    const fontLinkId = `gf-${font.family.replace(/\s+/g, "-").toLowerCase()}-${font.bodyWeight}-${font.buttonWeight}-${font.headingWeight}`

    const injectLink = () => {
      const head = iframe.contentDocument?.head

      // If we already have the correct font link, bail out.
      if (!head || currentFontLinkId.current === fontLinkId) return

      // Remove the previous font link (if it exists)
      if (currentFontLinkId.current) {
        head.querySelector(`#${currentFontLinkId.current}`)?.remove()
      }

      // Build and inject new <link>
      const link = iframe.contentDocument!.createElement("link")
      link.id = fontLinkId
      link.rel = "stylesheet"
      link.href = fontUrl
      link.crossOrigin = "anonymous"
      head.appendChild(link)
      currentFontLinkId.current = fontLinkId
    }

    if (iframe.contentDocument?.readyState === "complete") {
      injectLink()
    } else {
      iframe.addEventListener("load", injectLink)
    }

    // Always remove font <link> when font or iframe changes, or when component unmounts
    return () => {
      iframe.removeEventListener("load", injectLink)
      if (currentFontLinkId.current) {
        iframe.contentDocument?.head?.querySelector(`#${currentFontLinkId.current}`)?.remove()
        currentFontLinkId.current = null
      }
    }
  }, [iframeRef, font])
}
