import type { GeneratePreSignedController } from "../types/asset"

export class AssetService {
  private static instance: AssetService | null = null

  private constructor() {}

  static init() {
    if (!AssetService.instance) {
      AssetService.instance = new AssetService()
    }
    return AssetService.instance
  }

  async generatePreSignedUrl(c: GeneratePreSignedController) {
    return c.json(200)
  }
}
