"use client"

import { Input, type InputProps } from "@app/ui/components/input"
import { cn } from "@app/ui/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export const PasswordInput = ({ className, ...props }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const VisibilityIcon = isVisible ? EyeOffIcon : EyeIcon

  return (
    <div className="relative">
      <Input
        className={cn("pr-9", className)}
        type={isVisible ? "text" : "password"}
        {...props}
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className="text-muted-foreground absolute inset-y-0 right-0 cursor-pointer size-9 flex items-center justify-center transition-colors hover:text-accent-foreground bg-none"
      >
        <VisibilityIcon className="size-4 pointer-events-none" />
      </button>
    </div>
  )
}
