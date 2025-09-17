import { AssetController } from "../controllers/asset-controller"
import { AssetService } from "../services/asset-service"

const assetService = AssetService.init()
const assetController = AssetController.init(assetService)

export { assetController, assetService }
