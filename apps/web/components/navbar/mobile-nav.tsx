"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className=" lg:hidden size-8 bg-green-700/60 transition-colors hover:bg-green-700/50 flex items-center justify-center rounded-md text-white cursor-pointer"
    >
      {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
    </button>
  )
}
