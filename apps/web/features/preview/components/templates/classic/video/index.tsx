import type { VideoSection as Content, YoutubeVideo } from "@app/core/types"
import { memo, useMemo } from "react"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

interface VideoSectionProps {
  content: Content
}

function isYoutubeVideo(video: Content["video"]): video is YoutubeVideo {
  return Boolean(video.type === "youtube" && video.youtubeUrl)
}

export const VideoSection = memo(function VideoSection({ content }: VideoSectionProps) {
  const { heading, description, video } = content

  const headingContent = useMemo(
    () => (heading.enabled && heading?.text ? heading.text : null),
    [heading],
  )
  const descriptionContent = useMemo(
    () => (description.enabled && description?.text ? description.text : null),
    [description],
  )
  const youtubeUrl = useMemo(() => (isYoutubeVideo(video) ? video.youtubeUrl : null), [video])

  return (
    <SectionRoot className="overflow-hidden">
      {(headingContent || descriptionContent) && (
        <SectionHeader className="py-7 px-8">
          {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
          {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
        </SectionHeader>
      )}
      {youtubeUrl && (
        <figure>
          <iframe
            allowFullScreen
            title="YouTube video player"
            className="w-full rounded-b-3xl aspect-video"
            allow="accelerometer; autoplay; encrypted-media;"
            src={youtubeUrl}
          />
        </figure>
      )}
    </SectionRoot>
  )
})
