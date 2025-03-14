/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 