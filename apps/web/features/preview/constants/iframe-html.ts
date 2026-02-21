// Determine environment at build time for optimal tree-shaking
const isDev = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production"

// In dev mode: inject the main server CSS for quick refreshes
const DEV_STYLESHEET = `<link rel="stylesheet" href="/_next/static/chunks/%5Broot-of-the-server%5D__2529b5cf._.css" data-precedence="next_static/chunks/[root-of-the-server]__2529b5cf._.css">`

export const IFRAME_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <!-- DNS prefetch for faster connection establishment -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    
    <!-- Preconnect for optimized Google Fonts fetch (fonts will be injected dynamically) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

    <!-- Main app CSS -->
    ${isDev ? DEV_STYLESHEET : ""}
    <link rel="stylesheet" href="/_next/static/chunks/1e4d4b3faa85cc35.css" data-precedence="next" />
    <link rel="stylesheet" href="/_next/static/chunks/d41ba60faff93bff.css" data-precedence="next" />

    <!-- Minified baseline CSS with font optimization -->
    <style>
      html{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;}
      *,*:before,*:after{box-sizing:inherit;}
      body{margin:0;padding:0;min-height:100vh;background:#fff;font-family:var(--font-template,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif);}
    </style>
  </head>
  <body></body>
</html>
`
