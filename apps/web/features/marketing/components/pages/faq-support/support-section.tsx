import { AskSupportForm } from "@/features/marketing/components/forms/faq-support"

export const SupportSection = () => {
  return (
    <section className="mx-auto max-w-3xl space-y-8 mb-24">
      <div className="flex items-center justify-center flex-col gap-4 text-center">
        <h2 className="font-medium text-2xl md:text-3xl">Submit your support request</h2>
        <p className="font-normal text-muted-foreground max-w-lg mx-auto text-base">
          If you wish to get our help and support, please complete the form below. Our team will
          respond promptly to assist you with your request."
        </p>
      </div>

      <AskSupportForm />
    </section>
  )
}
