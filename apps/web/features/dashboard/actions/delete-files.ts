"use server"

import { dbHttp } from "@app/database/index"
import { file } from "@app/database/schema"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { inArray } from "drizzle-orm"
import { s3Client } from "./s3-remove"

type DeleteStorage = {
  key: string
}

export const deleteFiles = async (ids: string[]) => {
  let keys: DeleteStorage[]

  if (ids?.length) {
    keys = await dbHttp.delete(file).where(inArray(file.id, ids)).returning({ key: file.key })

    if (keys?.length > 0) {
      await Promise.all(
        keys.map(({ key }) => {
          return s3Client.send(
            new DeleteObjectCommand({
              Bucket: process?.env?.S3_UPLOAD_BUCKET!,
              Key: key,
            }),
          )
        }),
      )

      return { count: keys?.length }
    }
  }

  return { count: 0 }
}
