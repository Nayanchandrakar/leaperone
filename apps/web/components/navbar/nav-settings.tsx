"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { LogOutIcon, Settings } from "lucide-react"
import Link from "next/link"
import { useLogout } from "@/features/auth/hooks/logout/use-logout"
import type { User } from "@/types"

interface NavSettingProps {
  user: User
}

export const NavSettings = ({ user }: NavSettingProps) => {
  const { mutate, isPending } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image!} alt={user?.name} />
          <AvatarFallback className="text-primary font-semibold bg-green-50">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground first-letter:uppercase truncate text-sm font-medium">
            {user?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/account-settings">
            <Settings size={16} />
            <span>Account settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem disabled={isPending} onClick={() => mutate()}>
          <LogOutIcon size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
