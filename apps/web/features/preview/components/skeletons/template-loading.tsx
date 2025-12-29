import { Loader2 } from "lucide-react"

export const TemplateLoading = () => {
  return (
    <section className="w-full h-screen flex-center bg-muted">
      <Loader2 className="size-6 animate-spin" />
    </section>
  )
}
