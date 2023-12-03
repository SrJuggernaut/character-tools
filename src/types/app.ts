export interface AppState {
  theme: 'light' | 'dark'
  tokenizer: 'cl100k_base' | 'llama'
  openSettings: boolean
  characterCardExportNameTemplate: string
}
