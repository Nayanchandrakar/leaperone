import { useEffect, useState } from "react"

/**
 * Font loading state for tracking when fonts are ready
 */
export interface FontLoadingState {
  /** True while the font is currently loading */
  isLoading: boolean
  /** True when the font has successfully loaded */
  isLoaded: boolean
  /** Error if font loading failed */
  error: Error | null
}

/**
 * Hook to track font loading state using the CSS Font Loading API
 * This helps prevent layout shift and provides loading feedback
 *
 * @param fontFamily - The font family name to track
 * @param fontWeight - Optional font weight to check (defaults to 400)
 * @returns Loading state for the specified font
 *
 * @example
 * const { isLoading, isLoaded } = useFontLoadingState("Inter", 400)
 */
export function useFontLoadingState(fontFamily: string, fontWeight = 400): FontLoadingState {
  const [state, setState] = useState<FontLoadingState>({
    isLoading: true,
    isLoaded: false,
    error: null,
  })

  useEffect(() => {
    // Check if CSS Font Loading API is available
    if (typeof document === "undefined" || !document.fonts) {
      // Fallback: assume font is loaded after short delay
      const timer = setTimeout(() => {
        setState({ isLoading: false, isLoaded: true, error: null })
      }, 100)
      return () => clearTimeout(timer)
    }

    // Font descriptor for checking
    const fontDescriptor = `${fontWeight} 16px "${fontFamily}"`

    // Check if font is already loaded
    if (document.fonts.check(fontDescriptor)) {
      setState({ isLoading: false, isLoaded: true, error: null })
      return
    }

    // Start loading the font
    setState({ isLoading: true, isLoaded: false, error: null })

    document.fonts
      .load(fontDescriptor)
      .then(() => {
        setState({ isLoading: false, isLoaded: true, error: null })
      })
      .catch((error) => {
        setState({
          isLoading: false,
          isLoaded: false,
          error: error instanceof Error ? error : new Error("Font loading failed"),
        })
      })
  }, [fontFamily, fontWeight])

  return state
}
