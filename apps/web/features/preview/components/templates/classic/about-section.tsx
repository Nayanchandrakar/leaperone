interface AboutSectionProps {
  content: string
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <article className="space-y-3 bg-white p-8 pt-7 rounded-3xl text-center">
      <h2 className="text-[28px] font-semibold text-primary">About Me</h2>
      <p className="text-base font-normal text-muted-foreground ">{content}</p>
    </article>
  )
}
