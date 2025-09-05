export class ResponseHandler {
  private constructor() {}

  static error(error: any) {
    if (!error.success) {
      throw new Error(error?.error?.message ?? "Something went wrong")
    }
  }
}
