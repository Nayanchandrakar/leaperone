import type { PdfFile } from "@app/types"
import { FileCard } from "@/features/preview/components/cards/classic/file-card"

interface FilesListProps {
  background: boolean
  files: PdfFile[]
}

export const FilesList = ({ files, background }: FilesListProps) => {
  if (files?.length === 0) return null
  return files.map((file) => <FileCard key={file.id} background={background} file={file} />)
}
