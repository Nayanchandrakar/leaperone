import { FloatingActions } from "@/features/preview/components/buttons/classic/floating-actions"
import { ProfileImage } from "@/features/preview/components/templates/classic/profile/profile-image"
import { ProfileInfo } from "@/features/preview/components/templates/classic/profile/profile-info"
import { QuickActions } from "@/features/preview/components/templates/classic/quick-actions"
import { ClassicSectionRenderer } from "@/features/preview/components/templates/classic/section-renderer"
import { ThemeContainer } from "@/features/preview/components/ui/theme-container"
import type { TemplateProps } from "@/features/preview/types"

export default function ClassicTemplate({ design, mode, contents }: TemplateProps) {
  const profileData = {
    imageUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
    name: "Michael Anderson",
    jobTitle: "Sales Representative",
    company: "Electrica Automobiles",
  }

  return (
    <ThemeContainer design={design} data-mode={mode}>
      <section className="max-w-107.5 mx-auto mb-16 rounded-b-(--section-radius) sm:my-12 md:my-20 bg-(--bg-color) sm:rounded-3xl overflow-hidden space-y-5">
        <ProfileImage imageSrc={profileData.imageUrl} />
        <ProfileInfo
          name={profileData.name}
          company={profileData.company}
          jobTitle={profileData.jobTitle}
        />
        <div className="space-y-5 p-2 xs:p-4 pt-0">
          <QuickActions />
          {Array.isArray(contents) &&
            contents
              .filter((content) => content.enabled)
              .map((content) => <ClassicSectionRenderer key={content?.id} content={content} />)}
        </div>
      </section>
      <FloatingActions />
    </ThemeContainer>
  )
}
