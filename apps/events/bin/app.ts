#!/usr/bin/env node
import { App } from "aws-cdk-lib"
import { S3LambdaStack } from "@/lib/stacks/s3-lambda-stack"

const app = new App()

// new S3LambdaStack(app, "S3LambdaStack", {
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT!,
//     region: process.env.CDK_DEFAULT_REGION!,
//   },
// })

new S3LambdaStack(app, "S3LambdaStack")
