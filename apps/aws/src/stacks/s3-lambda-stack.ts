import { Stack, type StackProps } from "aws-cdk-lib"

import type { Construct } from "constructs"
import { S3LambdaConstruct } from "@/constructs/s3-lambda-construct"
import type { Stage } from "@/types"

interface S3LambdaStackProps extends StackProps {
  stage: Stage
}

export class S3LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: S3LambdaStackProps) {
    super(scope, id, props)
    new S3LambdaConstruct(this, "S3LambdaConstruct", props.stage)
  }
}
