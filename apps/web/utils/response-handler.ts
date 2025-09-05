export class ResponseHandler {
  private constructor() {}

  static error(error: unknown) {
    // @ts-expect-error
    throw new Error(error?.error?.message ?? "Something went wrong")
  }
}
