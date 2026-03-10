export function ReactScan() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <head>
      <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
    </head>
  )
}
