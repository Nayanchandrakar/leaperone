import { BootStrap } from "@/bootstrap"
import { analyticsController } from "@/features/analytics/modules/analytics.module"
import { assetController } from "@/features/asset/modules/asset.module"
import { authController } from "@/features/auth/modules/auth.module"
import { businessController } from "@/features/business/modules/business.module"
import { invitationController } from "@/features/invitation/modules/invitation.module"
import { marketingController } from "@/features/marketing/modules/marketing.module"
import { subscriptionController } from "@/features/subscription/modules/subscription.module"
import { userController } from "@/features/user/modules/user.module"
import { workspaceController } from "@/features/workspace/modules/workspace.module"

const server = new BootStrap([
  analyticsController,
  assetController,
  authController,
  businessController,
  invitationController,
  marketingController,
  subscriptionController,
  userController,
  workspaceController,
])

server.listen()
