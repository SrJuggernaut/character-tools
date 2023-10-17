export interface CharacterBookEntry {
  keys: string[]
  content: string
  extensions: Record<string, any>
  enabled: boolean
  insertion_order: number
  case_sensitive?: boolean
  name?: string
  priority?: number
  id?: number
  comment?: string
  selective?: boolean
  secondary_keys?: string[]
  constant?: boolean
  position?: 'before_char' | 'after_char'
}

export interface CharacterBookData {
  name: string
  description?: string
  scan_depth?: number
  token_budget?: number
  recursive_scanning?: boolean
  extensions: Record<string, any>
  entries: CharacterBookEntry[]
}

export interface CharacterBookEditorState extends CharacterBookData {
  id?: string
}

export interface CharacterBookDatabaseData extends CharacterBookData {
  id: string
}
