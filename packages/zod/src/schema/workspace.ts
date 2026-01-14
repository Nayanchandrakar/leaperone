import { z } from "zod"

export const workspaceCardSettingSchema = z.object({
  createAndEdit: z.boolean(),
})
