export default function QrCodeEditor() {
  return (
    <form
      id="qr-code-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <h1>QR Code Editor</h1>
    </form>
  )
}
