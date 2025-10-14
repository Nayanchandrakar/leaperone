#!/usr/bin/env node
import { App } from "aws-cdk-lib"
import { S3LambdaStack } from "@/lib/stacks/s3-lambda-stack"
import { getStagingEnv } from "@/utils"

const app = new App()
const stagingEnv = getStagingEnv(app)

new S3LambdaStack(app, `S3LambdaStack-${stagingEnv.stage}`, stagingEnv)
