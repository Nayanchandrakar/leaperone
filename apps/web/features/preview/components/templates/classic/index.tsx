import { AboutSection } from "@/features/preview/components/templates/classic/about-section"
import { ButtonSection } from "@/features/preview/components/templates/classic/button-section"
import { ContactSection } from "@/features/preview/components/templates/classic/contact-section"
import { FloatingActions } from "@/features/preview/components/templates/classic/floating-actions"
import { ImageGallery } from "@/features/preview/components/templates/classic/image-gallery"
import { ProfileImage } from "@/features/preview/components/templates/classic/profile-image"
import { ProfileInfo } from "@/features/preview/components/templates/classic/profile-info"
import { QuickActions } from "@/features/preview/components/templates/classic/quick-actions"
import { SocialLinkSection } from "@/features/preview/components/templates/classic/social-link-section"
import { TeamSection } from "@/features/preview/components/templates/classic/team-section"
import { VideoSection } from "@/features/preview/components/templates/classic/video-section"

export const ClassicTemplate = () => {
  // Profile data
  const profileData = {
    imageUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
    name: "Michael Anderson",
    jobTitle: "Sales Representative",
    company: "Electrica Automobiles",
  }

  // About section data
  const aboutContent =
    "At Electrica, I help people find the right EV cars for their lifestyle. I'm here to make the process of owning your dream EV hassle-free, transparent, and genuinely enjoyable."

  // Gallery images
  const galleryImages = [
    "https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg",
    "https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg",
    "https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg",
  ]

  const galleryImagesGrid = [
    ...galleryImages,
    "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
  ]

  // Contact information
  const contactInfo = {
    phone: "+91 1234567890",
    email: "youremail@domain.com",
    address: {
      street: "Street name",
      city: "City name",
      state: "State name",
      pinCode: "Pin code",
    },
  }

  return (
    <section className="relative">
      <div className="max-w-107.5 mx-auto my-24 bg-muted p-4 space-y-5">
        <ProfileImage imageSrc={profileData.imageUrl} />
        <ProfileInfo
          name={profileData.name}
          company={profileData.company}
          jobTitle={profileData.jobTitle}
        />
        <QuickActions />
        <AboutSection content={aboutContent} />
        <ImageGallery
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
        />
        <ContactSection contactInfo={contactInfo} />
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
        />
      </div>
      <FloatingActions />
    </section>
  )
}
