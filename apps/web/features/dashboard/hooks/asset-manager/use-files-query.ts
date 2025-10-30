import { useQuery } from "@tanstack/react-query"
import { getFiles } from "@/features/dashboard/actions/get-files"

const workspaceId = "zshbyvkstvevylexhxfyackg"

export const useFilesQuery = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: async () => await getFiles(workspaceId),
  })
}
