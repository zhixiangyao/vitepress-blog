declare global {
  class APlayer {
    constructor(params: {
      container: HTMLElement
      fixed: boolean
      volume: number
      theme: string
      lrcType: number
      audio: {
        name: string
        artist: string
        url: string
        lrc: string
        cover: string
      }[]
    })

    lrc: {
      hide(): void
    }
  }

  class RaindropFX {
    constructor(params: { canvas: HTMLCanvasElement; background: string })

    resize(w: number, h: number): void

    start(): void
  }

  interface Window {
    copy(e: string): void
    initWidget(params: { waifuPath: string; apiPath: string; cdnPath?: string }): unknown
    APlayer: typeof APlayer
    RaindropFX: typeof RaindropFX
  }
}

export {}
