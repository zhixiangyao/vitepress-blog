/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SSR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
