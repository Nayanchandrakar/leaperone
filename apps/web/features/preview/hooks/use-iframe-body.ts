import { useCallback, useEffect, useRef, useState } from "react"

/**
 * A high-performance React hook for accessing an iframe's body element.
 *
 * Features:
 * - Cross-browser compatible (Chrome, Firefox, Safari, Edge)
 * - Event-driven approach (no polling)
 * - RAF-batched updates for performance
 * - Proper cleanup and memory management
 * - Handles cross-origin iframes gracefully
 */
export function useIframeBody() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [body, setBody] = useState<HTMLElement | null>(null)

  // Refs for cleanup
  const rafIdRef = useRef<number | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const cleanupFnsRef = useRef<Array<() => void>>([])

  // Stable function to get body element with cross-origin handling
  const getIframeBody = useCallback((): HTMLElement | null => {
    const iframe = iframeRef.current
    if (!iframe) return null

    try {
      // Cross-origin iframes will throw on contentDocument access
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      return doc?.body ?? null
    } catch {
      // Cross-origin iframe - cannot access body
      return null
    }
  }, [])

  // RAF-batched body update to prevent layout thrashing
  const scheduleBodyUpdate = useCallback(() => {
    // Cancel any pending update
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      const newBody = getIframeBody()
      setBody((prev) => (prev === newBody ? prev : newBody))
    })
  }, [getIframeBody])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) {
      setBody(null)
      return
    }

    // Cleanup array for this effect cycle
    const cleanups: Array<() => void> = []
    cleanupFnsRef.current = cleanups

    // Helper to add event listener with automatic cleanup tracking
    const addListener = <K extends keyof HTMLElementEventMap>(
      target: EventTarget,
      event: K | string,
      handler: EventListener,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(event, handler, options)
      cleanups.push(() => target.removeEventListener(event, handler, options))
    }

    // Primary: iframe load event (works in all browsers)
    addListener(iframe, "load", scheduleBodyUpdate, { passive: true })

    // Try to access contentDocument (may fail for cross-origin)
    let doc: Document | null = null
    try {
      doc = iframe.contentDocument || iframe.contentWindow?.document || null
    } catch {
      // Cross-origin - fall back to load event only
      doc = null
    }

    if (doc) {
      // Check current state immediately
      if (doc.readyState === "complete" || doc.readyState === "interactive") {
        scheduleBodyUpdate()
      }

      // Listen for document ready state changes (browser-compatible)
      addListener(doc, "readystatechange", scheduleBodyUpdate, { passive: true })
      addListener(doc, "DOMContentLoaded", scheduleBodyUpdate, { passive: true })

      // MutationObserver for dynamic body changes (Chromium quirks)
      // Only observe documentElement for body additions, not deep subtree
      if (doc.documentElement) {
        const observer = new MutationObserver((mutations) => {
          // Only process if body-related mutations occurred
          const hasBodyChange = mutations.some(
            (m) =>
              m.type === "childList" &&
              (Array.from(m.addedNodes).some(
                (n) => n.nodeName === "BODY" || n.nodeName === "HTML",
              ) ||
                Array.from(m.removedNodes).some(
                  (n) => n.nodeName === "BODY" || n.nodeName === "HTML",
                )),
          )
          if (hasBodyChange) {
            scheduleBodyUpdate()
          }
        })

        observer.observe(doc.documentElement, {
          childList: true,
          subtree: false, // Only direct children of documentElement
        })

        // Also observe document for html element changes
        observer.observe(doc, {
          childList: true,
          subtree: false,
        })

        observerRef.current = observer
        cleanups.push(() => observer.disconnect())
      }
    }

    // Initial sync update (handles already-loaded iframes)
    scheduleBodyUpdate()

    return () => {
      // Cancel pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }

      // Run all cleanup functions
      for (const fn of cleanups) {
        fn()
      }
      cleanupFnsRef.current = []
      observerRef.current = null
    }
  }, [scheduleBodyUpdate])

  return { body, iframeRef }
}
