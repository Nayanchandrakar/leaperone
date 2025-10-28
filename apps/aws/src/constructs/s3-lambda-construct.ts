import { join } from "node:path"
import { Duration, RemovalPolicy } from "aws-cdk-lib"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3n from "aws-cdk-lib/aws-s3-notifications"
import { Construct } from "constructs"
import type { Stage } from "@/types"

export class S3LambdaConstruct extends Construct {
  public readonly bucket: s3.Bucket
  public readonly fn: lambda.Function
  public readonly distribution: cloudfront.Distribution

  constructor(scope: Construct, id: string, stage: Stage) {
    super(scope, id)

    /** Highly impoortant */
    const isProd = stage === "prod"

    this.bucket = new s3.Bucket(this, `AppBucket-${stage}`, {
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    })

    this.distribution = new cloudfront.Distribution(this, `AppCdn-${stage}`, {
      defaultBehavior: {
        origin: new cloudfrontOrigins.S3Origin(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      },
      defaultRootObject: "",
      comment: `CDN for ${stage} bucket`,
    })

    this.fn = new NodejsFunction(this, `lambda-${stage}`, {
      memorySize: 128,
      handler: "handler",
      entry: "src/lambda/index.ts",
      timeout: Duration.seconds(10),
      environment: {
        STAGE: stage,
        DATABASE_URL: process.env.DATABASE_URL!,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
      },
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

    this.bucket.grantReadWrite(this.fn)
    this.bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(this.fn),
      {
        prefix: "asset-manager",
      },
    )
  }
}
