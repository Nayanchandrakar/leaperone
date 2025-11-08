import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default async function TermsAndConditionPage() {
  await new Promise((resolve) => setTimeout(resolve, 10000))
  return (
    <DashboardContainer>
      <DashboardTitle>Form Terms & Privacy</DashboardTitle>

      <p className="mt-4 text-muted-foreground text-sm font-normal">
        Your form’s Terms & Conditions and Privacy Policy will be visible to your card visitors who
        choose to view them before submitting the form. The support email you enter will appear
        alongside for legal or data-related queries. You can replace our default policy links with
        your own links or add custom text instead.
      </p>
    </DashboardContainer>
  )
}
