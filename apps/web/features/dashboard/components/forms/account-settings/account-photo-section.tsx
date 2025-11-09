"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import { Icons } from "@/components/shared/icons"

export function AccountPhotoSection() {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div className="relative w-fit">
        <Avatar className="size-25 relative">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Icons.pencil className="absolute bottom-0 -right-0.5 size-7" />
      </div>
      <Button variant="green-outline">Remove Account Photo</Button>
    </div>
  )
}
