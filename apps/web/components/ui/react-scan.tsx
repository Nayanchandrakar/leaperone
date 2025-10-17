export const ReactScan = () => {
  if (process.env.NODE_ENV === "production") return null

  return (
    <script
      crossOrigin="anonymous"
      src="//unpkg.com/react-scan/dist/auto.global.js"
    />
  )
}
