interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly URL_BASE_FRONT: string

  readonly VITE_MODE: string
  readonly VITE_DEV: string
  readonly VITE_PROD: string
  readonly VITE_TEST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
