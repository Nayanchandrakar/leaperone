import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

interface VideoSectionProps {
  title: string
  description: string
  videoUrl: string
}

export const VideoSection = ({ title, description, videoUrl }: VideoSectionProps) => {
  return (
    <SectionRoot className="overflow-hidden">
      <SectionHeader className="py-7 px-8">
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <figure>
        <iframe
          allowFullScreen
          title="YouTube video player"
          className="w-full rounded-b-3xl aspect-video"
          allow="accelerometer; autoplay; encrypted-media;"
          src={videoUrl}
        />
      </figure>
    </SectionRoot>
  )
}
