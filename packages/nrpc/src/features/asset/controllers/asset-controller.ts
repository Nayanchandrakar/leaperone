import type { AssetService } from "../services/asset-service"
import type { PreSignedUrlController } from "../types/asset"

export class AssetController {
  private static instance: AssetController | null = null
  private assetService: AssetService

  private constructor(assetService: AssetService) {
    this.assetService = assetService
  }

  static init(assetService: AssetService) {
    if (!AssetController.instance) {
      AssetController.instance = new AssetController(assetService)
    }
    return AssetController.instance
  }

  preSignedUrl = async (c: PreSignedUrlController) => {
    return await this.assetService.preSignedUrl(c)
  }
}
