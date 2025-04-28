export interface CharacterBookEntry {
  id?: number
  name?: string
  comment?: string
  enabled: boolean
  case_sensitive?: boolean
  selective?: boolean
  constant?: boolean
  position: 'before_char' | 'after_char'
  keys: string[]
  secondary_keys: string[]
  content: string
  insertion_order: number
  priority?: number
  // biome-ignore lint/suspicious/noExplicitAny: Since an extension could use any type of value
  extensions: Record<string, any>
}

export interface CharacterBookData {
  name: string
  description?: string
  scan_depth?: number
  token_budget?: number
  recursive_scanning?: boolean
  // biome-ignore lint/suspicious/noExplicitAny: Since an extension could use any type of value
  extensions: Record<string, any>
  entries: CharacterBookEntry[]
}

export interface CharacterBookEditorState extends CharacterBookData {
  id?: string
}

export interface CharacterBookDatabaseData extends CharacterBookData {
  id: string
}
