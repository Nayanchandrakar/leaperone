import { Separator } from "@app/ui/components/separator"
import { TermsPrivacyForm } from "@/features/dashboard/components/forms/agreement-form/terms-privacy"
import { FormAgreementHeading } from "@/features/dashboard/components/pages/agreement-form/form-agreement-heading"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"

export default function TestPage() {
  return (
    <DashboardContainer>
      <section className="max-w-3xl">
        <FormAgreementHeading />
        <Separator className="my-8" />
        <TermsPrivacyForm />
      </section>
    </DashboardContainer>
  )
}
