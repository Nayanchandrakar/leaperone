import { extname } from "node:path"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "@/config/s3"

export async function getEventData(bucket: string, key: string, size: number) {
  const command = new HeadObjectCommand({ Bucket: bucket, Key: key })
  const { Metadata } = await s3Client.send(command)

  if (!Metadata?.["storage-id"]) return null

  const mime = Metadata?.["file-type"] ?? "application/octet-stream"
  const ext = extname(key)

  return {
    size,
    mime,
    key,
    ext,
    bucket,
    name: Metadata["file-name"]!,
    storageId: Metadata["storage-id"]!,
    uploadedBy: Metadata["uploaded-by"]!,
    workspaceId: Metadata["workspace-id"]!,
  }
}
