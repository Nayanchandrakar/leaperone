import { join } from "node:path"
import { Duration, RemovalPolicy } from "aws-cdk-lib"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3n from "aws-cdk-lib/aws-s3-notifications"
import { Construct } from "constructs"
import type { Stage } from "@/types"

export class S3LambdaConstruct extends Construct {
  public readonly bucket: s3.Bucket
  public readonly fn: lambda.Function

  constructor(scope: Construct, id: string, stage: Stage) {
    super(scope, id)

    /** Highly impoortant */
    const isProd = stage === "prod"

    this.bucket = new s3.Bucket(this, `AppBucket-${stage}`, {
      autoDeleteObjects: !isProd,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    })

    this.fn = new NodejsFunction(this, `lambda-${stage}`, {
      memorySize: 128,
      handler: "handler",
      entry: "lambda/index.ts",
      timeout: Duration.seconds(3),
      environment: { STAGE: stage },
      runtime: lambda.Runtime.NODEJS_22_X,
      bundling: {
        esbuildArgs: {
          "--minify": true,
          "--format": "cjs",
          "--platform": "node",
          "--tree-shaking": true,
        },
      },
      depsLockFilePath: join(__dirname, "../../../../bun.lock"),
    })

    this.fn.logGroup.applyRemovalPolicy(RemovalPolicy.DESTROY)

    this.bucket.grantRead(this.fn)
    this.bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3n.LambdaDestination(this.fn),
      {
        prefix: "asset-manager/",
      },
    )
  }
}
