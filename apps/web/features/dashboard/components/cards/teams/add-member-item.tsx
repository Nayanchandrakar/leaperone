import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddMemberItem() {
  const router = useRouter()

  const handleAddMember = () => {
    router.push("/invite")
  }

  return (
    <button
      type="button"
      onClick={handleAddMember}
      className="border-2 border-dashed rounded-lg p-4 sm:p-5 xl:p-6 flex-center transition-colors hover:border-primary/30 cursor-pointer"
    >
      <span className="flex gap-2 items-center text-primary text-sm">
        <Plus className="size-4" />
        Add another Team member
      </span>
    </button>
  )
}
