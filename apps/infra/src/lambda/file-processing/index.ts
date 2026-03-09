import { bootStrapFile } from "@app/database/repository/file"
import type { InsertFile } from "@app/database/types"
import type { S3Event } from "aws-lambda"
import { db } from "@/config/database"
import { getEventData } from "@/utils/process-event"

export const handler = async (event: S3Event): Promise<void> => {
  console.log("Start processing S3 event:", { recordCount: event.Records.length })

  try {
    const eventRequests = await Promise.allSettled(
      event.Records.map(({ s3 }) => getEventData(s3.bucket.name, s3.object.key, s3.object.size)),
    )

    const data = eventRequests.reduce<InsertFile[]>((acc, promise) => {
      if (promise.status === "fulfilled" && promise.value) {
        acc.push(promise.value)
      }
      return acc
    }, [])

    if (data.length === 0) {
      console.log("No valid file data found. Nothing to process.")
      return
    }

    await bootStrapFile(db, data)
    console.log(`Processed ${data.length} files and updated storage usage.`)
  } catch (error) {
    console.error("Error during file processing:", error)
    throw error
  }
}
