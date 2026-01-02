"use client"

import { useMemo } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { separateSections } from "@/features/preview/utils/seperate-sections"

export const dynamic = "force-static"

export default function PreviewPage() {
  const design = useDesignEditorStore((state) => state.config)
  const content = useContentEditorStore((state) => state.sections)
  const { floatingButton, mainSections } = useMemo(() => separateSections(content), [content])

  // const googleFontHref = useMemo(() => {
  //   if (!font || isSystemFont(font.family)) return null
  //   return getGoogleFontsUrl(font)
  // }, [font])

  return (
    <TemplateRenderer
      design={design}
      template="classic"
      contents={mainSections}
      floating={floatingButton}
    />
  )

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
}
