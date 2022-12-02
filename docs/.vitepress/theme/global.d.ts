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

  interface Window {
    copy(e: string): void
    initWidget(params: { waifuPath: string; apiPath: string; cdnPath?: string }): unknown
  }
}

export {}
