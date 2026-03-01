import { Spinner } from "@app/ui/components/spinner"

export const TemplateLoading = () => {
  return (
    <section className="w-full h-screen flex-center bg-muted">
      <Spinner className="size-5" />
    </section>
  )
}
