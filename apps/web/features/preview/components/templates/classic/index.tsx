import { FloatingActions } from "@/features/preview/components/buttons/classic/floating-actions"
import { ProfileImage } from "@/features/preview/components/templates/classic/profile-image"
import { ProfileInfo } from "@/features/preview/components/templates/classic/profile-info"
import { QuickActions } from "@/features/preview/components/templates/classic/quick-actions"
import { ClassicSectionRenderer } from "@/features/preview/components/templates/classic/section-renderer"
import { ThemeContainer } from "@/features/preview/components/ui/theme-container"
import type { TemplateProps } from "@/features/preview/types"

export default function ClassicTemplate({ design, mode, contents }: TemplateProps) {
  // Profile data
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

          {/* <ImageGallery
            layout="list"
            images={galleryImages}
            title="Our EV Collection"
            description="Discover our latest collection of electric vehicles from leading EV brands."
          />
          <ImageGallery
            layout="grid-two"
            title="Our EV Collection"
            images={galleryImagesGrid}
            description="Discover our latest collection of electric vehicles from leading EV brands."
          />
          <ImageGallery
            layout="featured"
            images={galleryImages}
            title="Our EV Collection"
            description="Discover our latest collection of electric vehicles from leading EV brands."
          />
          <ImageGallery
            layout="carousel"
            images={galleryImages}
            title="Our EV Collection"
            description="Discover our latest collection of electric vehicles from leading EV brands."
          /> */}
          {/* <ContactSection contactInfo={contactInfo} />
          <SocialLinkSection />
          <ButtonSection
            title="Button section"
            buttonText="Visit Website"
            description="Add a description or click on eye icon to hide this."
          />
          <TeamSection
            title="Meet the team"
            description="Add a description or click on eye icon to hide this."
          />
          <VideoSection
            title="Video"
            description="Add a description or click on eye icon to hide this."
            videoUrl="https://www.youtube-nocookie.com/embed/mfv0V1SxbNA?si=TFysOtlLt1XiFrFs"
          /> */}
        </div>
      </section>
      <FloatingActions />
    </ThemeContainer>
  )
}
