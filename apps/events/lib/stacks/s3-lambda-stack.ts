import { Stack, type StackProps } from "aws-cdk-lib"

import type { Construct } from "constructs"
import { S3LambdaConstruct } from "@/lib/constructs/s3-lambda-construct"

export class S3LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    new S3LambdaConstruct(this, "S3LambdaConstruct")
  }
}
