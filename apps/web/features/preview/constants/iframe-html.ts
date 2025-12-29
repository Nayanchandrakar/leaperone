// Determine environment at build time for optimal tree-shaking
const isDev = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production"

// In dev mode: inject the main server CSS for quick refreshes
const DEV_STYLESHEET = `<link rel="stylesheet" href="/_next/static/chunks/%5Broot-of-the-server%5D__2529b5cf._.css" data-precedence="next_static/chunks/[root-of-the-server]__2529b5cf._.css">`

// Google Fonts: keep the font fetching quick & async, using a performant font-display swap
const GOOGLE_FONT_FAMILY = "Lobster"
const GOOGLE_FONT_HREF = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
  GOOGLE_FONT_FAMILY,
)}:wght@400;700&display=swap`

export const IFRAME_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <!-- Preconnect and preloading for optimized Google Fonts fetch -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="preload" as="style" href="${GOOGLE_FONT_HREF}" />
    <link rel="stylesheet" href="${GOOGLE_FONT_HREF}" media="all" />
    <style>
      @font-face {
        font-family: '${GOOGLE_FONT_FAMILY}';
        font-display: swap;
      }
    </style>

    <!-- Main app CSS -->
    ${isDev ? DEV_STYLESHEET : ""}
    <link rel="stylesheet" href="/_next/static/chunks/d41ba60faff93bff.css" data-precedence="next" />
    <link rel="stylesheet" href="/_next/static/chunks/e805e21f2b026e03.css" data-precedence="next" />

    <!-- Minified baseline CSS -->
    <style>
      html{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
      *,*:before,*:after{box-sizing:inherit;}
      body{margin:0;padding:0;min-height:100vh;background:#fff;}
    </style>
  </head>
  <body></body>
</html>
`
