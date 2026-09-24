import { join } from "node:path"
import type { StackProps } from "aws-cdk-lib"
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as origins from "aws-cdk-lib/aws-cloudfront-origins"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs"
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3n from "aws-cdk-lib/aws-s3-notifications"
import type { Construct } from "constructs"
import type { Environment } from "@/types"

interface FileUploadStackProps extends StackProps {
  environment: Environment
}

export class FileUploadStack extends Stack {
  constructor(scope: Construct, id: string, props: FileUploadStackProps) {
    super(scope, id, props)

    const { environment } = props
    const prefix = `leaperone-${environment}`
    const isProd = environment === "production"

    // S3 bucket for uploads
    const uploadBucket = new s3.Bucket(this, "Upload-bucket", {
      enforceSSL: true,
      versioned: isProd,
      bucketName: prefix,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          maxAge: 3000,
          allowedHeaders: ["*"],
          allowedMethods: [s3.HttpMethods.PUT],
          allowedOrigins: [process.env.ORIGIN_URL!],
        },
      ],
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      lifecycleRules: [{ abortIncompleteMultipartUploadAfter: Duration.days(1) }],
    })

    // CloudFront CDN for downloading the uploaded files (read-only, HTTPS enforced)
    const distribution = new cloudfront.Distribution(this, "CDN", {
      // domainNames: isProd ? ["leaperone.com"] : undefined,
      comment: `${prefix} file CDN`,
      defaultBehavior: {
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        origin: origins.S3BucketOrigin.withOriginAccessControl(uploadBucket as s3.IBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    })

    // CloudWatch log group for Lambda
    const logGroup = new LogGroup(this, "File-processing-log-group", {
      logGroupName: `${prefix}-file-processing-log-group`,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      retention: isProd ? RetentionDays.TWO_WEEKS : RetentionDays.THREE_DAYS,
    })

    // Lambda function for file processing (triggered on S3 object creation)
    const processingLambda = new NodejsFunction(this, "File-processing-lambda-fn", {
      logGroup,
      memorySize: 128,
      retryAttempts: 2,
      handler: "handler",
      timeout: Duration.seconds(15),
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: "src/lambda/file-processing/index.ts",
      functionName: `${prefix}-file-processing-lambda`,
      bundling: {
        minify: true,
        platform: "node",
        format: OutputFormat.ESM,
        externalModules: ["@aws-sdk/*"],
      },
      depsLockFilePath: join(__dirname, "../../../../bun.lock"),
      environment: {
        ENVIRONMENT: environment,
        DATABASE_URL: process.env.DATABASE_URL!,
      },
    })

    // Permissions: allow Lambda to read from the upload bucket (could also grant write if needed)
    uploadBucket.grantRead(processingLambda)

    // S3 event: on object creation (upload complete), trigger Lambda.
    uploadBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(processingLambda),
      { prefix: "asset-manager/" },
    )

    // Outputs for stack consumers/verification
    new CfnOutput(this, "BucketName", {
      value: uploadBucket.bucketName,
      description: "S3 bucket for file uploads",
    })

    new CfnOutput(this, "CDNUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront CDN URL — use this to serve files to users",
    })

    new CfnOutput(this, "LambdaName", {
      value: processingLambda.functionName,
      description: "Lambda function for file processing",
    })
  }
}
