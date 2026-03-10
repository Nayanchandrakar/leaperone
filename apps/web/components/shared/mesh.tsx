export function CornerMesh() {
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

export function RadialMesh() {
  return (
    <div
      className="absolute inset-0 z-[-1]"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(188, 255, 163, 0.44) 0%, transparent 70%)",
        mixBlendMode: "multiply",
      }}
    />
  )
}
