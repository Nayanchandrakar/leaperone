import { Spinner } from "@app/ui/components/spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] ">
      <Spinner className="size-5" />
    </div>
  )
}
