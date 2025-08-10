"use client"

import { Input } from "@leapercrm/ui/components/input"

export default function HomePage() {
  // variants
  const variants = ["default", "secondary", "outline", "destructive"]

  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      {variants.map((value) => (
        <Input variant="gray" key={value} />
      ))}
    </div>
  )
}
