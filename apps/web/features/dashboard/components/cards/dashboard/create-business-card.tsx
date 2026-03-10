import { Plus } from "lucide-react"
import Link from "next/link"

export function CreateBusinessCard() {
  return (
    <>
      <p className="text-muted-foreground font-normal text-sm text-center max-w-lg mx-auto my-8">
        No digital business card created yet. Start your smart networking journey by creating one
        now!
      </p>
      <Link
        href="/"
        className="flex items-center justify-center border-2 border-dashed w-full rounded-lg text-primary gap-1.5 text-sm p-8 cursor-pointer hover:border-primary/80 transition-colors"
      >
        <Plus className="size-4" />
        Create Digital Business Card
      </Link>
    </>
  )
}
