import { test } from "node:test"
import * as cdk from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { S3LambdaStack } from "@/lib/stacks/s3-lambda-stack"

test("SQS Queue Created", () => {
  const app = new cdk.App()

  const stack = new S3LambdaStack(app, "MyTestStack")
  const template = Template.fromStack(stack)

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "index.handler",
    MemorySize: 128,
    Runtime: "nodejs22.x",
    Timeout: 3,
  })
})
