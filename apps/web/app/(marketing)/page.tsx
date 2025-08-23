"use client"
import { Button } from "@myleaper/ui/components/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOut, useSession } from "@/lib/auth"

export default function HomePage() {
  const router = useRouter()
  const { data } = useSession()

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute top-0">{JSON.stringify(data)}</div>
      <Button
        onClick={async () => {
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-up")
                toast.success("Logout succefully")
              },

              onError: ({ error }) => {
                toast.success(error.message)
              },
            },
          })
        }}
      >
        Logout
      </Button>
    </div>
  )
}
