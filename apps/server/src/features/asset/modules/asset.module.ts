import { AssetController } from "@/features/asset/controllers/asset.controller"
import { AssetService } from "@/features/asset/services/asset.service"
import { StorageService } from "@/features/shared/services/storage.service"

const storagService = new StorageService()
const assetService = new AssetService(storagService)
const assetController = new AssetController(assetService)

export { storagService, assetService, assetController }
