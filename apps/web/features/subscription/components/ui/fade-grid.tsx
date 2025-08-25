export const FadeGridPattern = () => {
  return (
    <div
      className="fixed inset-0 z-[-1]"
      style={{
        backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
        backgroundSize: "32px 32px",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
      }}
    />
  )
}
