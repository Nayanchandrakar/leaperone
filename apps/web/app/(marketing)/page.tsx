"use client"
import { Button } from "@myleaper/ui/components/button"
import { authClient } from "@/lib/auth"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button
        onClick={async () => {
          await authClient.signUp.email({
            username: "check",
            email: "helo@gmail.com",
            name: "nihal",
            password: "Hello234234",
          })
        }}
      >
        Submit
      </Button>
    </div>
  )
}
