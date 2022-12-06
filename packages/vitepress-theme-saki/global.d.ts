declare global {
  class RaindropFX {
    constructor(params: { canvas: HTMLCanvasElement; background: string })

    resize(w: number, h: number): void

    start(): void
  }

  interface Window {
    copy(e: string): void
    initWidget(params: { waifuPath: string; apiPath: string; cdnPath?: string }): unknown
    RaindropFX: typeof RaindropFX
  }
}

export {}
