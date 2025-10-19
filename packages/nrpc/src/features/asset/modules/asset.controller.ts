import type { PreSignedUrlController } from "../types/asset"
import type { AssetService } from "./asset.service"

export class AssetController {
  private static instance: AssetController | null = null
  private constructor(private readonly assetService: AssetService) {}

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
