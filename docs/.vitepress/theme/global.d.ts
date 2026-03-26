interface SimulatorOptions {
  viewport: any
  spawnInterval: [number, number]
  spawnSize: [number, number]
  spawnLimit: number
  slipRate: number
  motionInterval: [number, number]
  xShifting: [number, number]
  colliderSize: number
  trailDropDensity: number
  trailDropSize: [number, number]
  trailDistance: [number, number]
  trailSpread: number
  initialSpread: number
  shrinkRate: number
  velocitySpread: number
  evaporate: number
  gravity: number
}
interface RenderOptions {
  canvas: HTMLCanvasElement
  width: number
  height: number
  background: string
  backgroundBlurSteps: number
  mist: boolean
  mistColor: [number, number, number, number]
  mistTime: number
  mistBlurStep: number
  dropletsPerSeconds: number
  dropletSize: [number, number]
  smoothRaindrop: [number, number]
  refractBase: number
  refractScale: number
  raindropCompose: 'smoother' | 'harder'
  raindropLightPos: [number, number, number, number]
  raindropDiffuseLight: [number, number, number]
  raindropShadowOffset: number
  raindropEraserSize: [number, number]
  raindropSpecularLight: [number, number, number]
  raindropSpecularShininess: number
  raindropLightBump: number
}

interface RaindropFXOptions extends SimulatorOptions, RenderOptions {}

declare class RaindropFX {
  public options: Options
  public renderer: RaindropRenderer
  public simulator: RaindropSimulator

  constructor(options: Partial<RaindropFXOptions> & { canvas: HTMLCanvasElement })

  resize(w: number, h: number): void

  start(): void

  async setBackground(background: string): Promise<void>
}

declare global {
  interface Window {
    copy?: (e: string) => void
    RaindropFX: typeof RaindropFX
    dataLayer: any[]
  }
}

export {}
