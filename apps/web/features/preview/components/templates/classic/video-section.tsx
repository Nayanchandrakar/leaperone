interface VideoSectionProps {
  title: string
  description: string
  videoUrl: string
}

export const VideoSection = ({ title, description, videoUrl }: VideoSectionProps) => {
  return (
    <article className="bg-white rounded-3xl overflow-hidden">
      <header className="space-y-3 py-7 px-8 text-center">
        <h2 className="text-[28px] font-semibold text-primary">{title}</h2>
        <p className="text-base font-normal text-muted-foreground">{description}</p>
      </header>

      <figure>
        <iframe
          allowFullScreen
          title="YouTube video player"
          className="w-full rounded-b-3xl aspect-video"
          allow="accelerometer; autoplay; encrypted-media;"
          src={videoUrl}
        />
      </figure>
    </article>
  )
}
