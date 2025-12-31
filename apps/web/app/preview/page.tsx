"use client"

import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import ClassicTemplate from "@/features/preview/components/templates/classic"

export default function PreviewPage() {
  const design = useDesignEditorStore((state) => state.config)
  const content = useContentEditorStore((state) => state.sections)

  // const googleFontHref = useMemo(() => {
  //   if (!font || isSystemFont(font.family)) return null
  //   return getGoogleFontsUrl(font)
  // }, [font])

  return (
    // <>
    //   Optimized font loading for Google Fonts
    //   {googleFontHref && (
    //     <>
    //       <link
    //         rel="preconnect"
    //         href="https://fonts.googleapis.com"
    //         crossOrigin="anonymous"
    //         key="preconnect-googleapis"
    //       />
    //       <link
    //         rel="preconnect"
    //         href="https://fonts.gstatic.com"
    //         crossOrigin="anonymous"
    //         key="preconnect-gstatic"
    //       />
    //       {/* Preload font stylesheet for faster loading */}
    //       <link rel="preload" as="style" href={googleFontHref} key="preload-google-font" />
    //       <link rel="stylesheet" href={googleFontHref} media="all" key="dynamic-google-font" />
    //     </>
    //   )}
    // </>
    <ClassicTemplate content={content} design={design} mode="preview" />
  )
}
