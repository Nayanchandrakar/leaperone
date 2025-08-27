"use client"

import { Button } from "@myleaper/ui/components/button"
import { useRouter } from "next/navigation"
import { Container } from "@/components/shared/container"
import { signOut, useSession } from "@/lib/auth"

export default function FaqSupportPage() {
  const router = useRouter()
  const session = useSession()
  return (
    <Container className="py-12 space-y-8">
      <div>User : {JSON.stringify(session)}</div>
      <Button
        onClick={async () => {
          await signOut()
          router.push("/")
        }}
      >
        Logout
      </Button>
    </Container>
  )
}
