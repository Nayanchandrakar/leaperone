import { ClassicTemplate } from "@/features/preview/components/templates/classic"

export const dynamic = "force-static"

const selectedFont = "Lobster"
const googleFontHref = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
  selectedFont,
)}:wght@400;700&display=swap`

export default function PreviewPage() {
  return (
    <>
      {/* Optimized font loading for Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
        key="preconnect-googleapis"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
        key="preconnect-gstatic"
      />
      {/* Only load font stylesheet once and leverage preload hint */}
      <link rel="preload" as="style" href={googleFontHref} key="preload-google-font" />
      <link rel="stylesheet" href={googleFontHref} media="all" key="dynamic-google-font" />
      {/* Inline fallback font style in case stylesheet fails */}
      <style
        // Provide fallback to avoid FOIT on font load failure
        dangerouslySetInnerHTML={{
          __html: `
      @font-face {
        font-family: '${selectedFont}';
        font-display: swap;
      }
      `,
        }}
      />
      <ClassicTemplate />
    </>
  )
}
