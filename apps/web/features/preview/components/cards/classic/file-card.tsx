import type { PdfFile } from "@app/types"
import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { ArrowUpRight } from "lucide-react"
import { useMemo } from "react"
import { SectionRoot } from "@/features/preview/components/ui/section"

type FileCardProps = {
  file: PdfFile
  background: boolean
}

export const FileCard = ({ file, background }: FileCardProps) => {
  const { title, subTitle, fileSrc, thumbnail } = file

  const titleContent = useMemo(
    () => (title?.enabled && title?.text ? title.text : null),
    [title?.enabled, title?.text],
  )

  const subTitleContent = useMemo(
    () => (subTitle?.enabled && subTitle?.text ? subTitle.text : null),
    [subTitle?.enabled, subTitle?.text],
  )

  return (
    <SectionRoot background={background} className="py-6 px-8 flex items-center gap-3">
      {thumbnail && (
        <Avatar className="size-12">
          <AvatarImage alt="pdf-file-thumbnail" src={thumbnail} />
        </Avatar>
      )}
      <a
        href={fileSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full space-y-2 text-template-muted-foreground"
      >
        {titleContent && (
          <div className="flex items-start gap-2 justify-between">
            <p className="font-template-button text-base">{titleContent}</p>
            <ArrowUpRight className="shrink-0 size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        )}
        {subTitleContent && (
          <p className="font-template-body text-sm wrap-break-word">{subTitleContent}</p>
        )}
      </a>
    </SectionRoot>
  )
}
