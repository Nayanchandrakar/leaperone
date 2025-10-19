import { AssetController } from "./asset.controller"
import { AssetService } from "./asset.service"

const assetService = AssetService.init()
const assetController = AssetController.init(assetService)

export { assetController, assetService }
