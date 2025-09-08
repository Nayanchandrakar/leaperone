import type { InferRequestType, InferResponseType } from "hono"
import type { client } from "@/lib/hono/client"

export type LoginRequest = InferRequestType<
  typeof client.api.auth.login.$post
>["json"]

export type RegistRequest = InferRequestType<
  typeof client.api.auth.register.$post
>["json"]

export type UserNameRequest = InferRequestType<
  typeof client.api.auth.username.$get
>["query"]

export type RequestPasswordResetRequest = InferRequestType<
  (typeof client.api.auth)["request-password-reset"]["$post"]
>["json"]

export type ResetPasswordRequest = InferRequestType<
  (typeof client.api.auth)["reset-password"]["$post"]
>["json"]

export type FullSession = InferResponseType<
  (typeof client.api.auth)["get-session"]["$get"]
>

export type Session = FullSession["session"]
export type User = FullSession["user"]
