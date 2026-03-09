import { describe, expect, test } from "bun:test"
import * as cdk from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { FileUploadStack } from "../src/lib/file-upload-stack"
import type { Environment } from "../src/types"

function createStack(environment: Environment) {
  const app = new cdk.App()
  return new FileUploadStack(app, `FileUploadStack-${environment}`, {
    environment,
    description: `File upload infrastructure for ${environment}`,
  })
}

describe("FileUploadStack", () => {
  describe("development environment", () => {
    const stack = createStack("development")
    const template = Template.fromStack(stack)

    test("creates S3 bucket with correct configuration", () => {
      template.hasResourceProperties("AWS::S3::Bucket", {
        BucketName: "leaperone-development",
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
        CorsConfiguration: {
          CorsRules: [
            {
              MaxAge: 3000,
              AllowedHeaders: ["*"],
              AllowedMethods: ["PUT"],
              AllowedOrigins: [process.env.ORIGIN_URL],
            },
          ],
        },
        LifecycleConfiguration: {
          Rules: [
            {
              AbortIncompleteMultipartUpload: { DaysAfterInitiation: 1 },
              Status: "Enabled",
            },
          ],
        },
      })
    })

    test("creates CloudFront distribution", () => {
      template.resourceCountIs("AWS::CloudFront::Distribution", 1)
      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          Comment: "leaperone-development file CDN",
          DefaultCacheBehavior: {
            ViewerProtocolPolicy: "redirect-to-https",
          },
        },
      })
    })

    test("creates Lambda function with cost-optimized settings", () => {
      template.hasResourceProperties("AWS::Lambda::Function", {
        FunctionName: "leaperone-development-file-processing-lambda",
        Runtime: "nodejs22.x",
        MemorySize: 128,
        Timeout: 15,
      })
    })

    test("grants S3 permission to invoke Lambda", () => {
      template.hasResourceProperties("AWS::Lambda::Permission", {
        Action: "lambda:InvokeFunction",
        Principal: "s3.amazonaws.com",
      })
    })

    test("S3 event notification filters by asset-manager prefix", () => {
      template.hasResourceProperties("Custom::S3BucketNotifications", {
        NotificationConfiguration: {
          LambdaFunctionConfigurations: [
            {
              Events: ["s3:ObjectCreated:*"],
              Filter: {
                Key: {
                  FilterRules: [{ Name: "prefix", Value: "asset-manager/" }],
                },
              },
            },
          ],
        },
      })
    })

    test("log group has 3-day retention for development", () => {
      template.hasResourceProperties("AWS::Logs::LogGroup", {
        LogGroupName: "leaperone-development-file-processing-log-group",
        RetentionInDays: 3,
      })
    })

    test("outputs bucket name, CDN URL, and Lambda name", () => {
      const outputs = template.findOutputs("*")
      expect(Object.keys(outputs)).toHaveLength(3)
      expect(outputs).toHaveProperty("BucketName")
      expect(outputs).toHaveProperty("CDNUrl")
      expect(outputs).toHaveProperty("LambdaName")
    })
  })

  describe("production environment", () => {
    const stack = createStack("production")
    const template = Template.fromStack(stack)

    test("creates versioned S3 bucket", () => {
      template.hasResourceProperties("AWS::S3::Bucket", {
        BucketName: "leaperone-production",
        VersioningConfiguration: {
          Status: "Enabled",
        },
      })
    })

    test("Lambda has 128 MB memory for cost optimization", () => {
      template.hasResourceProperties("AWS::Lambda::Function", {
        MemorySize: 128,
      })
    })

    test("log group has 2-week retention for production", () => {
      template.hasResourceProperties("AWS::Logs::LogGroup", {
        LogGroupName: "leaperone-production-file-processing-log-group",
        RetentionInDays: 14,
      })
    })

    test("bucket has RETAIN removal policy in production", () => {
      const bucket = template.findResources("AWS::S3::Bucket")
      const bucketResource = Object.values(bucket)[0]
      expect(bucketResource?.DeletionPolicy).toBe("Retain")
    })
  })
})
