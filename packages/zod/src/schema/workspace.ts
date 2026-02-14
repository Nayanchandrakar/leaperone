import { z } from "zod"

export const workspaceSettingsSchema = z.object({
  createAndEdit: z.boolean(),
})
