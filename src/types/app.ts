export interface AppState {
  theme: 'light' | 'dark'
  tokenizer: 'cl100k_base' | 'o200k_base' | 'llama' | 'llama3'
  openSettings: boolean
  characterCardExportNameTemplate: string
  characterBookExportNameTemplate: string
}
