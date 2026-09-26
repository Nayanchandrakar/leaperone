import { WorkspaceController } from "@/features/worskpace/controllers/workspace.controller"
import { WorkspaceService } from "@/features/worskpace/services/workspace.service"

const workspaceService = new WorkspaceService()
const workspaceController = new WorkspaceController(workspaceService)

export { workspaceController, workspaceService }
