/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOUBAO_API_KEY: string
  readonly VITE_DOUBAO_API_URL: string
  readonly VITE_DOUBAO_MODEL_NAME: string
  readonly VITE_PROXY_TARGET: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}