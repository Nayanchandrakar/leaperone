export const FadeGridPattern = () => {
  return (
    <div
      className="fixed inset-0 z-[-1]"
      style={{
        backgroundImage: `
        linear-gradient(to right, transparent 0px, transparent 0px),
        linear-gradient(to bottom, transparent 0px, transparent 0px),
        radial-gradient(circle 800px at 0% 200px, rgba(188, 255, 163, 0.3), transparent)
      `,
        backgroundSize: "96px 64px, 96px 64px, 100% 100%",
      }}
    />
  )
}
