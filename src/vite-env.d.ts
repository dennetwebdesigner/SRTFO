/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST_SERVER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
