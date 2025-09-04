import type { InferRequestType } from "hono"
import type { client } from "@/lib/hono/client"

export type LoginRequest = InferRequestType<
  typeof client.api.auth.login.$post
>["json"]

export type RegistRequest = InferRequestType<
  typeof client.api.auth.register.$post
>["json"]

export type UserNameRequest = InferRequestType<
  typeof client.api.auth.username.$get
>["param"]
