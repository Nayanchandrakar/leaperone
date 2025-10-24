import { Hono } from "hono"

export abstract class HttpController {
  public readonly router: Hono

  constructor(public readonly path: string) {
    this.router = new Hono()
  }

  protected abstract initializeRoutes(): void
}
