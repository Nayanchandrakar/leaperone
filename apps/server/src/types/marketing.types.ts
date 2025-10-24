import type { ContactUsFormSchema, SupportFormSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type AskSupportContext = Context<
  HonoEnv,
  "/ask-support",
  ControllerIO<"json", SupportFormSchema>
>

export type ContactUsContext = Context<
  HonoEnv,
  "/contact-us",
  ControllerIO<"json", ContactUsFormSchema>
>
