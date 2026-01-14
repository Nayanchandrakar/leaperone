import { WorkspaceController } from "@/features/workspace/controllers/workspace.controller"
import { WorkspaceService } from "@/features/workspace/services/workspace.service"

const workspaceService = new WorkspaceService()
const workspaceController = new WorkspaceController(workspaceService)

export { workspaceService, workspaceController }
