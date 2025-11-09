import { NameChangeDialog } from "@/features/dashboard/components/dialogs/account-settings/name-change-dialog"
import { AccountActionsSection } from "@/features/dashboard/components/forms/account-settings/account-actions-section"
import { AccountPhotoSection } from "@/features/dashboard/components/forms/account-settings/account-photo-section"
import { ProfileInformationSection } from "@/features/dashboard/components/forms/account-settings/profile-information-section"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AccountSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Account Settings</DashboardTitle>
      <article className="mt-8 max-w-2xl mx-auto w-full space-y-10">
        <AccountPhotoSection />
        <ProfileInformationSection />
        <AccountActionsSection />
      </article>

      <NameChangeDialog />
    </DashboardContainer>
  )
}
