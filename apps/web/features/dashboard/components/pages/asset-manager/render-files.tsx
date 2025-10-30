import { FileCard } from "@/features/dashboard/components/cards/asset-manager/file-card"

type RenderFileProps = {
  data: any[]
}

export const RenderFiles = ({ data }: RenderFileProps) => {
  return data.map((file) => <FileCard key={file.id} file={file} />)
}
