import { beforeAll, describe, expect, test } from "bun:test"
import { App } from "aws-cdk-lib"
import { Match, Template } from "aws-cdk-lib/assertions"
import type { Stage } from "@/types"
import { S3LambdaStack } from "../src/stacks/s3-lambda-stack"

let stage: Stage = "dev"
const lambdaFnName = "lambda"
const bucketName = "AppBucket"
const stackName = "S3LambdaStack"
const constructName = "S3LambdaConstruct"

describe("Development stage", () => {
  let template: Template

  beforeAll(() => {
    const app = new App()
    const stack = new S3LambdaStack(app, `${stackName}-${stage}`, { stage })
    template = Template.fromStack(stack)
  })

  test("Creates S3 bucket with encryption and public access blocked", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: { SSEAlgorithm: "AES256" },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
  })

  test("Deletes S3 bucket when CloudFormation stack is removed", () => {
    const resources = template.findResources("AWS::S3::Bucket")
    Object.values(resources).forEach((resource) => {
      expect(resource.DeletionPolicy).toBe("Delete")
      expect(resource.UpdateReplacePolicy).toBe("Delete")
    })
  })

  test("Grants Lambda function read-only access to S3 bucket", () => {
    template.hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: Match.anyValue(),
            Effect: "Allow",

            Resource: [
              {
                "Fn::GetAtt": [
                  Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
                  "Arn",
                ],
              },
              {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::GetAtt": [
                        Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
                        "Arn",
                      ],
                    },
                    "/*",
                  ],
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test("Creates Lambda function with correct runtime, handler, and environment", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs22.x",
      MemorySize: 128,
      Timeout: 3,
      Environment: {
        Variables: { STAGE: stage },
      },
    })
  })

  test("Allows S3 bucket to invoke the Lambda function", () => {
    template.hasResourceProperties("AWS::Lambda::Permission", {
      Action: "lambda:InvokeFunction",
      FunctionName: {
        "Fn::GetAtt": [Match.stringLikeRegexp(`${constructName}${lambdaFnName}${stage}`), "Arn"],
      },
      Principal: "s3.amazonaws.com",
      SourceArn: {
        "Fn::GetAtt": [Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`), "Arn"],
      },
    })
  })

  test("Triggers Lambda only for uploads to /asset-manager/ path in S3", () => {
    template.hasResourceProperties("Custom::S3BucketNotifications", {
      ServiceToken: {
        "Fn::GetAtt": [Match.stringLikeRegexp("BucketNotificationsHandler"), "Arn"],
      },
      BucketName: {
        Ref: Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
      },
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Events: ["s3:ObjectCreated:Put"],
            Filter: {
              Key: {
                FilterRules: [
                  {
                    Name: "prefix",
                    Value: "asset-manager/",
                  },
                ],
              },
            },
            LambdaFunctionArn: {
              "Fn::GetAtt": [
                Match.stringLikeRegexp(`${constructName}${lambdaFnName}${stage}`),
                "Arn",
              ],
            },
          },
        ],
      },
      Managed: true,
      SkipDestinationValidation: false,
    })
  })
})

describe("Production stage", () => {
  let template: Template

  beforeAll(() => {
    stage = "prod"
    const app = new App()
    const stack = new S3LambdaStack(app, `${stackName}-${stage}`, { stage })
    template = Template.fromStack(stack)
  })

  test("Creates S3 bucket with encryption and public access blocked", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: { SSEAlgorithm: "AES256" },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
  })

  test("Retains S3 bucket when CloudFormation stack is removed", () => {
    const resources = template.findResources("AWS::S3::Bucket")
    Object.values(resources).forEach((resource) => {
      expect(resource.DeletionPolicy).toBe("Retain")
      expect(resource.UpdateReplacePolicy).toBe("Retain")
    })
  })

  test("Grants Lambda function read-only access to S3 bucket", () => {
    template.hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: Match.anyValue(),
            Effect: "Allow",

            Resource: [
              {
                "Fn::GetAtt": [
                  Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
                  "Arn",
                ],
              },
              {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::GetAtt": [
                        Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
                        "Arn",
                      ],
                    },
                    "/*",
                  ],
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test("Creates Lambda function with correct runtime, handler, and environment", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs22.x",
      MemorySize: 128,
      Timeout: 3,
      Environment: {
        Variables: { STAGE: stage },
      },
    })
  })

  test("Allows S3 bucket to invoke the Lambda function", () => {
    template.hasResourceProperties("AWS::Lambda::Permission", {
      Action: "lambda:InvokeFunction",
      FunctionName: {
        "Fn::GetAtt": [Match.stringLikeRegexp(`${constructName}${lambdaFnName}${stage}`), "Arn"],
      },
      Principal: "s3.amazonaws.com",
      SourceArn: {
        "Fn::GetAtt": [Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`), "Arn"],
      },
    })
  })

  test("Triggers Lambda only for uploads to /asset-manager/ path in S3", () => {
    template.hasResourceProperties("Custom::S3BucketNotifications", {
      ServiceToken: {
        "Fn::GetAtt": [Match.stringLikeRegexp("BucketNotificationsHandler"), "Arn"],
      },
      BucketName: {
        Ref: Match.stringLikeRegexp(`${constructName}${bucketName}${stage}`),
      },
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Events: ["s3:ObjectCreated:Put"],
            Filter: {
              Key: {
                FilterRules: [
                  {
                    Name: "prefix",
                    Value: "asset-manager/",
                  },
                ],
              },
            },
            LambdaFunctionArn: {
              "Fn::GetAtt": [
                Match.stringLikeRegexp(`${constructName}${lambdaFnName}${stage}`),
                "Arn",
              ],
            },
          },
        ],
      },
      Managed: true,
      SkipDestinationValidation: false,
    })
  })
})
