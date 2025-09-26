import type { ContactUsFormSchema, SupportFormSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "../../../types"

export type AskSupportController = Context<
  HonoEnv,
  "/ask-support",
  ControllerIO<"json", SupportFormSchema>
>

export type ContactUsController = Context<
  HonoEnv,
  "/contact-us",
  ControllerIO<"json", ContactUsFormSchema>
>
