import type { Environments } from "@/types"

export const envConfig: Environments = {
  dev: {
    account: process.env.DEV_ACCOUNT!,
    region: process.env.DEV_ACCOUNT_REGIION!,
  },
  staging: {
    account: process.env.STAGING_ACCOUNT!,
    region: process.env.STAGING_ACCOUNT_REGION!,
  },
  prod: {
    account: process.env.PROD_ACCOUNT!,
    region: process.env.PROD_ACCOUNT_REGION!,
  },
}
