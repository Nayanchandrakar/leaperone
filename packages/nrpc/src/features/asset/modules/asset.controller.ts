import type { GeneratePreSignedController } from "../types"
import type { AssetService } from "./assset.service"

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

  async generatePreSignedUrl(c: GeneratePreSignedController) {
    return await this.assetService.generatePreSignedUrl(c)
  }
}
