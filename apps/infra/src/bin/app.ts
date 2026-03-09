import * as cdk from "aws-cdk-lib"
import { FileUploadStack } from "@/lib/file-upload-stack"
import type { Environment } from "@/types"

const app = new cdk.App()
const environment = process.env.NODE_ENV as Environment

// Create the file upload stack
new FileUploadStack(app, `FileUploadStack-${environment}`, {
  environment,
  env: {
    region: process.env.CDK_REGION!,
    account: process.env.CDK_ACCOUNT_ID!,
  },
  description: `File upload infrastructure for ${environment}`,
})
