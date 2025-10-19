import { bootStrapFile } from "@app/database/repository/file"
import type { InsertFile } from "@app/database/types"
import type { S3Event } from "aws-lambda"
import { getEventData } from "@/utils"

export const handler = async (event: S3Event): Promise<void> => {
  console.log(`Processing ${event.Records.length} S3 record(s).`)

  try {
    const eventRequests = await Promise.allSettled(
      event.Records.map(({ s3 }) =>
        getEventData(s3.bucket.name, s3.object.key, s3.object.size),
      ),
    )

    const data = eventRequests.reduce<InsertFile[]>((acc, promise) => {
      if (promise.status === "fulfilled" && promise.value) {
        acc.push(promise.value)
      }
      return acc
    }, [])

    if (data.length === 0) {
      console.log("No valid data extracted from S3 records. Exiting.")
      return
    }

    await bootStrapFile(data)
  } catch (error) {
    console.error("Critical error during data aggregation:", error)
  }
}
