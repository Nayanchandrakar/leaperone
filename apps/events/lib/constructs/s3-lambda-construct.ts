import { join } from "node:path"
import { Duration, RemovalPolicy } from "aws-cdk-lib"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3n from "aws-cdk-lib/aws-s3-notifications"
import { Construct } from "constructs"

export class S3LambdaConstruct extends Construct {
  public readonly bucket: s3.Bucket
  public readonly fn: lambda.Function

  constructor(scope: Construct, id: string) {
    super(scope, id)

    const isProd = true

    this.bucket = new s3.Bucket(this, "AppBucket", {
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    })

    this.fn = new NodejsFunction(this, "lambda", {
      memorySize: 128,
      handler: "handler",
      entry: "lambda/index.ts",
      timeout: Duration.seconds(3),
      runtime: lambda.Runtime.NODEJS_22_X,
      depsLockFilePath: join(__dirname, "../../../../bun.lock"),
      bundling: {
        esbuildArgs: {
          "--minify": true,
          "--format": "cjs",
          "--platform": "node",
          "--tree-shaking": true,
        },
      },
    })

    this.bucket.grantRead(this.fn)

    // Event notification
    this.bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(this.fn),
    )
  }
}
