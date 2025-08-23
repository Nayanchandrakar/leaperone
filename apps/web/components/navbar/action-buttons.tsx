import { Button } from "@myleaper/ui/components/button"

export const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="secondary">
        Start Free Trail
      </Button>

      <Button size="sm" variant="outline">
        Login
      </Button>
    </div>
  )
}
